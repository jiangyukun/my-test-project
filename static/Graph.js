import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class Graph extends mxGraph {
  constructor(container, model, renderHint, stylesheet, themes) {
      mxGraph.call(this, container, model, renderHint, stylesheet);
      
      this.themes = themes || this.defaultThemes;
      this.currentEdgeStyle = mxUtils.clone(this.defaultEdgeStyle);
      this.currentVertexStyle = mxUtils.clone(this.defaultVertexStyle);

      // Sets the base domain URL and domain path URL for relative links.
      var b = this.baseUrl;
      var p = b.indexOf('//');
      this.domainUrl = '';
      this.domainPathUrl = '';
      
      if (p > 0)
      {
          var d = b.indexOf('/', p + 2);

          if (d > 0)
          {
              this.domainUrl = b.substring(0, d);
          }
          
          d = b.lastIndexOf('/');
          
          if (d > 0)
          {
              this.domainPathUrl = b.substring(0, d + 1);
          }
      }
      
      // Adds support for HTML labels via style. Note: Currently, only the Java
      // backend supports HTML labels but CSS support is limited to the following:
      // http://docs.oracle.com/javase/6/docs/api/index.html?javax/swing/text/html/CSS.html
      // TODO: Wrap should not affect isHtmlLabel output (should be handled later)
      this.isHtmlLabel = function(cell)
      {
          var state = this.view.getState(cell);
          var style = (state != null) ? state.style : this.getCellStyle(cell);
          
          return (style != null) ? (style['html'] == '1' || style[mxConstants.STYLE_WHITE_SPACE] == 'wrap') : false;
      };
      
      // Implements a listener for hover and click handling on edges
      if (this.edgeMode)
      {
          var start = {
              point: null,
              event: null,
              state: null,
              handle: null,
              selected: false
          };
          
          // Uses this event to process mouseDown to check the selection state before it is changed
          this.addListener(mxEvent.FIRE_MOUSE_EVENT, (sender, evt) => {
              if (evt.getProperty('eventName') == 'mouseDown' && this.isEnabled())
              {
                  var me = evt.getProperty('event');
                  
                  if (!mxEvent.isControlDown(me.getEvent()) && !mxEvent.isShiftDown(me.getEvent()))
                  {
                      var state = me.getState();
          
                      if (state != null)
                      {
                          // Checks if state was removed in call to stopEditing above
                          if (this.model.isEdge(state.cell))
                          {
                              start.point = new mxPoint(me.getGraphX(), me.getGraphY());
                              start.selected = this.isCellSelected(state.cell);
                              start.state = state;
                              start.event = me;
                              
                              if (state.text != null && state.text.boundingBox != null &&
                                  mxUtils.contains(state.text.boundingBox, me.getGraphX(), me.getGraphY()))
                              {
                                  start.handle = mxEvent.LABEL_HANDLE;
                              }
                              else
                              {
                                  var handler = this.selectionCellsHandler.getHandler(state.cell);
      
                                  if (handler != null && handler.bends != null && handler.bends.length > 0)
                                  {
                                      start.handle = handler.getHandleForEvent(me);
                                  }
                              }
                          }
                      }
                  }
              }
          });
          
          var mouseDown = null;
          
          this.addMouseListener(
          {
              mouseDown: function(sender, me) {},
              mouseMove: mxUtils.bind(this, function(sender, me)
              {
                  // Checks if any other handler is active
                  var handlerMap = this.selectionCellsHandler.handlers.map;
                  
                  for (var key in handlerMap)
                  {
                      if (handlerMap[key].index != null)
                      {
                          return;
                      }
                  }
                  
                  if (this.isEnabled() && !this.panningHandler.isActive() && !mxEvent.isControlDown(me.getEvent()) &&
                      !mxEvent.isShiftDown(me.getEvent()) && !mxEvent.isAltDown(me.getEvent()))
                  {
                      var tol = this.tolerance;
      
                      if (start.point != null && start.state != null && start.event != null)
                      {
                          var state = start.state;
                          
                          if (Math.abs(start.point.x - me.getGraphX()) > tol ||
                              Math.abs(start.point.y - me.getGraphY()) > tol)
                          {
                              // Lazy selection for edges inside groups
                              if (!this.isCellSelected(state.cell))
                              {
                                  this.setSelectionCell(state.cell);
                              }
                              
                              var handler = this.selectionCellsHandler.getHandler(state.cell);
                              
                              if (handler != null && handler.bends != null && handler.bends.length > 0)
                              {
                                  var handle = handler.getHandleForEvent(start.event);
                                  var edgeStyle = this.view.getEdgeStyle(state);
                                  var entity = edgeStyle == mxEdgeStyle.EntityRelation;
                                  
                                  // Handles special case where label was clicked on unselected edge in which
                                  // case the label will be moved regardless of the handle that is returned
                                  if (!start.selected && start.handle == mxEvent.LABEL_HANDLE)
                                  {
                                      handle = start.handle;
                                  }
                                  
                                  if (!entity || handle == 0 || handle == handler.bends.length - 1 || handle == mxEvent.LABEL_HANDLE)
                                  {
                                      // Source or target handle or connected for direct handle access or orthogonal line
                                      // with just two points where the central handle is moved regardless of mouse position
                                      if (handle == mxEvent.LABEL_HANDLE || handle == 0 || state.visibleSourceState != null ||
                                          handle == handler.bends.length - 1 || state.visibleTargetState != null)
                                      {
                                          if (!entity && handle != mxEvent.LABEL_HANDLE)
                                          {
                                              var pts = state.absolutePoints;
                                              
                                              // Default case where handles are at corner points handles
                                              // drag of corner as drag of existing point
                                              if (pts != null && ((edgeStyle == null && handle == null) ||
                                                  edgeStyle == mxEdgeStyle.OrthConnector))
                                              {
                                                  // Does not use handles if they were not initially visible
                                                  handle = start.handle;

                                                  if (handle == null)
                                                  {
                                                      var box = new mxRectangle(start.point.x, start.point.y);
                                                      box.grow(mxEdgeHandler.prototype.handleImage.width / 2);
                                                      
                                                      if (mxUtils.contains(box, pts[0].x, pts[0].y))
                                                      {
                                                          // Moves source terminal handle
                                                          handle = 0;
                                                      }
                                                      else if (mxUtils.contains(box, pts[pts.length - 1].x, pts[pts.length - 1].y))
                                                      {
                                                          // Moves target terminal handle
                                                          handle = handler.bends.length - 1;
                                                      }
                                                      else
                                                      {
                                                          // Checks if edge has no bends
                                                          var nobends = edgeStyle != null && (pts.length == 2 || (pts.length == 3 &&
                                                              ((Math.round(pts[0].x - pts[1].x) == 0 && Math.round(pts[1].x - pts[2].x) == 0) ||
                                                              (Math.round(pts[0].y - pts[1].y) == 0 && Math.round(pts[1].y - pts[2].y) == 0))));
                                                          
                                                          if (nobends)
                                                          {
                                                              // Moves central handle for straight orthogonal edges
                                                              handle = 2;
                                                          }
                                                          else
                                                          {
                                                              // Finds and moves vertical or horizontal segment
                                                              handle = mxUtils.findNearestSegment(state, start.point.x, start.point.y);
                                                              
                                                              // Converts segment to virtual handle index
                                                              if (edgeStyle == null)
                                                              {
                                                                  handle = mxEvent.VIRTUAL_HANDLE - handle;
                                                              }
                                                              // Maps segment to handle
                                                              else
                                                              {
                                                                  handle += 1;
                                                              }
                                                          }
                                                      }
                                                  }
                                              }
                                              
                                              // Creates a new waypoint and starts moving it
                                              if (handle == null)
                                              {
                                                  handle = mxEvent.VIRTUAL_HANDLE;
                                              }
                                          }
                                          
                                          handler.start(me.getGraphX(), me.getGraphX(), handle);
                                          start.state = null;
                                          start.event = null;
                                          start.point = null;
                                          start.handle = null;
                                          start.selected = false;
                                          me.consume();
      
                                          // Removes preview rectangle in graph handler
                                          this.graphHandler.reset();
                                      }
                                  }
                                  else if (entity && (state.visibleSourceState != null || state.visibleTargetState != null))
                                  {
                                      // Disables moves on entity to make it consistent
                                      this.graphHandler.reset();
                                      me.consume();
                                  }
                              }
                          }
                      }
                      else
                      {
                          // Updates cursor for unselected edges under the mouse
                          var state = me.getState();
                          
                          if (state != null)
                          {
                              // Checks if state was removed in call to stopEditing above
                              if (this.model.isEdge(state.cell))
                              {
                                  var cursor = null;
                                  var pts = state.absolutePoints;
                                  
                                  if (pts != null)
                                  {
                                      var box = new mxRectangle(me.getGraphX(), me.getGraphY());
                                      box.grow(mxEdgeHandler.prototype.handleImage.width / 2);
                                      
                                      if (state.text != null && state.text.boundingBox != null &&
                                          mxUtils.contains(state.text.boundingBox, me.getGraphX(), me.getGraphY()))
                                      {
                                          cursor = 'move';
                                      }
                                      else if (mxUtils.contains(box, pts[0].x, pts[0].y) ||
                                          mxUtils.contains(box, pts[pts.length - 1].x, pts[pts.length - 1].y))
                                      {
                                          cursor = 'pointer';
                                      }
                                      else if (state.visibleSourceState != null || state.visibleTargetState != null)
                                      {
                                          // Moving is not allowed for entity relation but still indicate hover state
                                          var tmp = this.view.getEdgeStyle(state);
                                          cursor = 'crosshair';
                                          
                                          if (tmp != mxEdgeStyle.EntityRelation && this.isOrthogonal(state))
                                          {
                                              var idx = mxUtils.findNearestSegment(state, me.getGraphX(), me.getGraphY());
                                              
                                              if (idx < pts.length - 1 && idx >= 0)
                                              {
                                                  cursor = (Math.round(pts[idx].x - pts[idx + 1].x) == 0) ?
                                                      'col-resize' : 'row-resize';
                                              }
                                          }
                                      }
                                  }
                                  
                                  if (cursor != null)
                                  {
                                      state.setCursor(cursor);
                                  }
                              }
                          }
                      }
                  }
              }),
              mouseUp: mxUtils.bind(this, function(sender, me)
              {
                  start.state = null;
                  start.event = null;
                  start.point = null;
                  start.handle = null;
              })
          });
      }
      
      // HTML entities are displayed as plain text in wrapped plain text labels
      this.cellRenderer.getLabelValue = function(state)
      {
          var result = mxCellRenderer.prototype.getLabelValue.apply(this, arguments);
          
          if (state.view.graph.isHtmlLabel(state.cell))
          {
              if (state.style['html'] != 1)
              {
                  result = mxUtils.htmlEntities(result, false);
              }
              else
              {
                  result = state.view.graph.sanitizeHtml(result);
              }
          }
          
          return result;
      };

      // All code below not available and not needed in embed mode
      if (typeof mxVertexHandler !== 'undefined')
      {
          this.setConnectable(true);
          this.setDropEnabled(true);
          this.setPanning(true);
          this.setTooltips(true);
          this.setAllowLoops(true);
          this.allowAutoPanning = true;
          this.resetEdgesOnConnect = false;
          this.constrainChildren = false;
          this.constrainRelativeChildren = true;
          
          // Do not scroll after moving cells
          this.graphHandler.scrollOnMove = false;
          this.graphHandler.scaleGrid = true;

          // Disables cloning of connection sources by default
          this.connectionHandler.setCreateTarget(false);
          this.connectionHandler.insertBeforeSource = true;
          
          // Disables built-in connection starts
          this.connectionHandler.isValidSource = function(cell, me)
          {
              return false;
          };

          // Sets the style to be used when an elbow edge is double clicked
          this.alternateEdgeStyle = 'vertical';

          if (stylesheet == null)
          {
              this.loadStylesheet();
          }

          // Adds page centers to the guides for moving cells
          var graphHandlerGetGuideStates = this.graphHandler.getGuideStates;
          this.graphHandler.getGuideStates = function()
          {
              var result = graphHandlerGetGuideStates.apply(this, arguments);
              
              // Create virtual cell state for page centers
              if (this.graph.pageVisible)
              {
                  var guides = [];
                  
                  var pf = this.graph.pageFormat;
                  var ps = this.graph.pageScale;
                  var pw = pf.width * ps;
                  var ph = pf.height * ps;
                  var t = this.graph.view.translate;
                  var s = this.graph.view.scale;

                  var layout = this.graph.getPageLayout();
                  
                  for (var i = 0; i < layout.width; i++)
                  {
                      guides.push(new mxRectangle(((layout.x + i) * pw + t.x) * s,
                          (layout.y * ph + t.y) * s, pw * s, ph * s));
                  }
                  
                  for (var j = 0; j < layout.height; j++)
                  {
                      guides.push(new mxRectangle((layout.x * pw + t.x) * s,
                          ((layout.y + j) * ph + t.y) * s, pw * s, ph * s));
                  }
                  
                  // Page center guides have predence over normal guides
                  result = guides.concat(result);
              }
              
              return result;
          };

          // Overrides zIndex for dragElement
          mxDragSource.prototype.dragElementZIndex = mxPopupMenu.prototype.zIndex;
          
          // Overrides color for virtual guides for page centers
          mxGuide.prototype.getGuideColor = function(state, horizontal)
          {
              return (state.cell == null) ? '#ffa500' /* orange */ : mxConstants.GUIDE_COLOR;
          };

          // Changes color of move preview for black backgrounds
          this.graphHandler.createPreviewShape = function(bounds)
          {
              this.previewColor = (this.graph.background == '#000000') ? '#ffffff' : mxGraphHandler.prototype.previewColor;
              
              return mxGraphHandler.prototype.createPreviewShape.apply(this, arguments);
          };
          
          // Handles parts of cells by checking if part=1 is in the style and returning the parent
          // if the parent is not already in the list of cells. container style is used to disable
          // step into swimlanes and dropTarget style is used to disable acting as a drop target.
          // LATER: Handle recursive parts
          this.graphHandler.getCells = function(initialCell)
          {
              var cells = mxGraphHandler.prototype.getCells.apply(this, arguments);
              var newCells = [];

              for (var i = 0; i < cells.length; i++)
              {
                  var state = this.graph.view.getState(cells[i]);
                  var style = (state != null) ? state.style : this.graph.getCellStyle(cells[i]);
                  
                  if (mxUtils.getValue(style, 'part', '0') == '1')
                  {
                      var parent = this.graph.model.getParent(cells[i]);
          
                      if (this.graph.model.isVertex(parent) && mxUtils.indexOf(cells, parent) < 0)
                      {
                          newCells.push(parent);
                      }
                  }
                  else
                  {
                      newCells.push(cells[i]);
                  }
              }

              return newCells;
          };

          // Handles parts of cells when cloning the source for new connections
          this.connectionHandler.createTargetVertex = function(evt, source)
          {
              var state = this.graph.view.getState(source);
              var style = (state != null) ? state.style : this.graph.getCellStyle(source);
              
              if (mxUtils.getValue(style, 'part', false))
              {
                  var parent = this.graph.model.getParent(source);

                  if (this.graph.model.isVertex(parent))
                  {
                      source = parent;
                  }
              }
              
              return mxConnectionHandler.prototype.createTargetVertex.apply(this, arguments);
          };
          
          var rubberband = new mxRubberband(this);
          
          this.getRubberband = function()
          {
                  return rubberband;
          };
          
          // Timer-based activation of outline connect in connection handler
          var startTime = new Date().getTime();
          var timeOnTarget = 0;
          
          var connectionHandlerMouseMove = this.connectionHandler.mouseMove;
          
          this.connectionHandler.mouseMove = function()
          {
                  var prev = this.currentState;
                  connectionHandlerMouseMove.apply(this, arguments);
                  
                  if (prev != this.currentState)
                  {
                      startTime = new Date().getTime();
                      timeOnTarget = 0;
                  }
                  else
                  {
                      timeOnTarget = new Date().getTime() - startTime;
                  }
          };

          // Activates outline connect after 1500ms with touch event or if alt is pressed inside the shape
          // outlineConnect=0 is a custom style that means do not connect to strokes inside the shape,
          // or in other words, connect to the shape's perimeter if the highlight is under the mouse
          // (the name is because the highlight, including all strokes, is called outline in the code)
          var connectionHandleIsOutlineConnectEvent = this.connectionHandler.isOutlineConnectEvent;
          
          this.connectionHandler.isOutlineConnectEvent = function(me)
          {
                  return (this.currentState != null && me.getState() == this.currentState && timeOnTarget > 2000) ||
                      ((this.currentState == null || mxUtils.getValue(this.currentState.style, 'outlineConnect', '1') != '0') &&
                      connectionHandleIsOutlineConnectEvent.apply(this, arguments));
          };
          
          // Adds shift+click to toggle selection state
          var isToggleEvent = this.isToggleEvent;
          this.isToggleEvent = function(evt)
          {
                  return isToggleEvent.apply(this, arguments) || mxEvent.isShiftDown(evt);
          };
          
          // Workaround for Firefox where first mouse down is received
          // after tap and hold if scrollbars are visible, which means
          // start rubberband immediately if no cell is under mouse.
          var isForceRubberBandEvent = rubberband.isForceRubberbandEvent;
          rubberband.isForceRubberbandEvent = function(me)
          {
                  return isForceRubberBandEvent.apply(this, arguments) ||
                      (mxUtils.hasScrollbars(this.graph.container) && mxClient.IS_FF &&
                      mxClient.IS_WIN && me.getState() == null && mxEvent.isTouchEvent(me.getEvent()));
          };
          
          // Shows hand cursor while panning
          var prevCursor = null;
          
          this.panningHandler.addListener(mxEvent.PAN_START, () => {
              if (this.isEnabled())
              {
                  prevCursor = this.container.style.cursor;
                  this.container.style.cursor = 'move';
              }
          });
              
          this.panningHandler.addListener(mxEvent.PAN_END, () => {
              if (this.isEnabled())
              {
                  this.container.style.cursor = prevCursor;
              }
          });

          this.popupMenuHandler.autoExpand = true;
          
          this.popupMenuHandler.isSelectOnPopup = function(me)
          {
              return mxEvent.isMouseEvent(me.getEvent());
          };
      
          // Handles links if graph is read-only or cell is locked
          var click = this.click;
          this.click = function(me)
          {
              var locked = me.state == null && me.sourceState != null && this.isCellLocked(me.sourceState.cell);
              
              if ((!this.isEnabled() || locked) && !me.isConsumed())
              {
                  var cell = (locked) ? me.sourceState.cell : me.getCell();
                  
                  if (cell != null)
                  {
                      var link = this.getLinkForCell(cell);
                      
                      if (link != null)
                      {
                          if (this.isCustomLink(link))
                          {
                              this.customLinkClicked(link);
                          }
                          else
                          {
                              this.openLink(link);
                          }
                      }
                  }
                  
                  if (this.isEnabled() && locked)
                  {
                      this.clearSelection();
                  }
              }
              else
              {
                  return click.apply(this, arguments);
              }
          };

          // Redirects tooltips for locked cells
          this.tooltipHandler.getStateForEvent = function(me)
          {
              return me.sourceState;
          };
          
          // Redirects cursor for locked cells
          var getCursorForMouseEvent = this.getCursorForMouseEvent; 
          this.getCursorForMouseEvent = function(me)
          {
              var locked = me.state == null && me.sourceState != null && this.isCellLocked(me.sourceState.cell);
              
              return this.getCursorForCell((locked) ? me.sourceState.cell : me.getCell());
          };
          
          // Shows pointer cursor for clickable cells with links
          // ie. if the graph is disabled and cells cannot be selected
          var getCursorForCell = this.getCursorForCell;
          this.getCursorForCell = function(cell)
          {
              if (!this.isEnabled() || this.isCellLocked(cell))
              {
                  var link = this.getLinkForCell(cell);
                  
                  if (link != null)
                  {
                      return 'pointer';
                  }
                  else if (this.isCellLocked(cell))
                  {
                      return 'default';
                  }
              }

              return getCursorForCell.apply(this, arguments);
          };
          
          // Changes rubberband selection to be recursive
          this.selectRegion = function(rect, evt)
          {
              var cells = this.getAllCells(rect.x, rect.y, rect.width, rect.height);
              this.selectCellsForEvent(cells, evt);
              
              return cells;
          };
          
          // Recursive implementation for rubberband selection
          this.getAllCells = function(x, y, width, height, parent, result)
          {
              result = (result != null) ? result : [];
              
              if (width > 0 || height > 0)
              {
                  var model = this.getModel();
                  var right = x + width;
                  var bottom = y + height;
      
                  if (parent == null)
                  {
                      parent = this.getCurrentRoot();
                      
                      if (parent == null)
                      {
                          parent = model.getRoot();
                      }
                  }
                  
                  if (parent != null)
                  {
                      var childCount = model.getChildCount(parent);
                      
                      for (var i = 0; i < childCount; i++)
                      {
                          var cell = model.getChildAt(parent, i);
                          var state = this.view.getState(cell);
                          
                          if (state != null && this.isCellVisible(cell) && mxUtils.getValue(state.style, 'locked', '0') != '1')
                          {
                              var deg = mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION) || 0;
                              var box = state;
                              
                              if (deg != 0)
                              {
                                  box = mxUtils.getBoundingBox(box, deg);
                              }
                              
                              if ((model.isEdge(cell) || model.isVertex(cell)) &&
                                  box.x >= x && box.y + box.height <= bottom &&
                                  box.y >= y && box.x + box.width <= right)
                              {
                                  result.push(cell);
                              }
      
                              this.getAllCells(x, y, width, height, cell, result);
                          }
                      }
                  }
              }
              
              return result;
          };

          // Never removes cells from parents that are being moved
          var graphHandlerShouldRemoveCellsFromParent = this.graphHandler.shouldRemoveCellsFromParent;
          this.graphHandler.shouldRemoveCellsFromParent = function(parent, cells, evt)
          {
              if (this.graph.isCellSelected(parent))
              {
                  return false;
              }
              
              return graphHandlerShouldRemoveCellsFromParent.apply(this, arguments);
          };

          // Unlocks all cells
          this.isCellLocked = function(cell)
          {
              var pState = this.view.getState(cell);
              
              while (pState != null)
              {
                  if (mxUtils.getValue(pState.style, 'locked', '0') == '1')
                  {
                      return true;
                  }
                  
                  pState = this.view.getState(this.model.getParent(pState.cell));
              }
              
              return false;
          };
          
          var tapAndHoldSelection = null;
          
          // Uses this event to process mouseDown to check the selection state before it is changed
          this.addListener(mxEvent.FIRE_MOUSE_EVENT, (sender, evt) => {
              if (evt.getProperty('eventName') == 'mouseDown')
              {
                  var me = evt.getProperty('event');
                  var state = me.getState();
                  
                  if (state != null && !this.isSelectionEmpty() && !this.isCellSelected(state.cell))
                  {
                      tapAndHoldSelection = this.getSelectionCells();
                  }
                  else
                  {
                      tapAndHoldSelection = null;
                  }
              }
          });
          
          // Tap and hold on background starts rubberband for multiple selected
          // cells the cell associated with the event is deselected
          this.addListener(mxEvent.TAP_AND_HOLD, (sender, evt) => {
              if (!mxEvent.isMultiTouchEvent(evt))
              {
                  var me = evt.getProperty('event');
                  var cell = evt.getProperty('cell');
                  
                  if (cell == null)
                  {
                      var pt = mxUtils.convertPoint(this.container,
                              mxEvent.getClientX(me), mxEvent.getClientY(me));
                      rubberband.start(pt.x, pt.y);
                  }
                  else if (tapAndHoldSelection != null)
                  {
                      this.addSelectionCells(tapAndHoldSelection);
                  }
                  else if (this.getSelectionCount() > 1 && this.isCellSelected(cell))
                  {
                      this.removeSelectionCell(cell);
                  }
                  
                  // Blocks further processing of the event
                  tapAndHoldSelection = null;
                  evt.consume();
              }
          });
      
          // On connect the target is selected and we clone the cell of the preview edge for insert
          this.connectionHandler.selectCells = function(edge, target)
          {
              this.graph.setSelectionCell(target || edge);
          };
          
          // Shows connection points only if cell not selected
          this.connectionHandler.constraintHandler.isStateIgnored = function(state, source)
          {
              return source && state.view.graph.isCellSelected(state.cell);
          };
          
          // Updates constraint handler if the selection changes
          this.selectionModel.addListener(mxEvent.CHANGE, () => {
              var ch = this.connectionHandler.constraintHandler;
              
              if (ch.currentFocus != null && ch.isStateIgnored(ch.currentFocus, true))
              {
                  ch.currentFocus = null;
                  ch.constraints = null;
                  ch.destroyIcons();
              }
              
              ch.destroyFocusHighlight();
          });
          
          // Initializes touch interface
          if (Graph.touchStyle)
          {
              this.initTouch();
          }
          
          /**
           * Adds locking
           */
          var graphUpdateMouseEvent = this.updateMouseEvent;
          this.updateMouseEvent = function(me)
          {
              me = graphUpdateMouseEvent.apply(this, arguments);
              
              if (me.state != null && this.isCellLocked(me.getCell()))
              {
                  me.state = null;
              }
              
              return me;
          };
      }
      
      //Create a unique offset object for each graph instance.
      this.currentTranslate = new mxPoint(0, 0);
  }

  static touchStyle = mxClient.IS_TOUCH || (mxClient.IS_FF && mxClient.IS_WIN) || navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 || window.urlParams == null || urlParams['touch'] == '1';

  static fileSupport = window.File != null && window.FileReader != null && window.FileList != null &&
      (window.urlParams == null || urlParams['filesupport'] != '0');

  static lineJumpsEnabled = true;
  static defaultJumpSize = 6;

  static createSvgImage(w, h, data) {
      var tmp = unescape(encodeURIComponent(
          '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + w + 'px" height="' + h + 'px" ' +
          'version="1.1">' + data + '</svg>'));

      return new mxImage('data:image/svg+xml;base64,' + ((window.btoa) ? btoa(tmp) : Base64.encode(tmp, true)), w, h)
  }

  static zapGremlins(text) {
      var checked = [];
      
      for (var i = 0; i < text.length; i++)
      {
          var code = text.charCodeAt(i);
          
          // Removes all control chars except TAB, LF and CR
          if ((code >= 32 || code == 9 || code == 10 || code == 13) &&
              code != 0xFFFF && code != 0xFFFE)
          {
              checked.push(text.charAt(i));
          }
      }
      
      return checked.join('');
  }

  static stringToBytes(str) {
      var arr = new Array(str.length);

      for (var i = 0; i < str.length; i++)
      {
          arr[i] = str.charCodeAt(i);
      }
      
      return arr;
  }

  static bytesToString(arr) {
      var result = new Array(arr.length);

      for (var i = 0; i < arr.length; i++)
      {
          result[i] = String.fromCharCode(arr[i]);
      }
      
      return result.join('');
  }

  static compressNode(node) {
      return Graph.compress(Graph.zapGremlins(mxUtils.getXml(node)));
  }

  static compress(data, deflate) {
      if (data == null || data.length == 0 || typeof(pako) === 'undefined')
      {
          return data;
      }
      else
      {
          var tmp = Graph.bytesToString((deflate) ? pako.deflate(encodeURIComponent(data)) :
              pako.deflateRaw(encodeURIComponent(data)));
          
          return (window.btoa) ? btoa(tmp) : Base64.encode(tmp, true);
      }
  }

  static decompress(data, inflate) {
      if (data == null || data.length == 0 || typeof(pako) === 'undefined')
      {
          return data;
      }
      else
      {
          var tmp = (window.atob) ? atob(data) : Base64.decode(data, true);
          
          return Graph.zapGremlins(decodeURIComponent(
              Graph.bytesToString((inflate) ? pako.inflate(tmp) :
                  pako.inflateRaw(tmp))));
      }
  }

  minFitScale = null;
  maxFitScale = null;
  linkPolicy = (urlParams['target'] == 'frame') ? 'blank' : (urlParams['target'] || 'auto');
  linkTarget = (urlParams['target'] == 'frame') ? '_self' : '_blank';
  linkRelation = 'nofollow noopener noreferrer';
  defaultScrollbars = !mxClient.IS_IOS;
  defaultPageVisible = true;
  lightbox = false;
  defaultPageBackgroundColor = '#ffffff';
  defaultPageBorderColor = '#ffffff';
  scrollTileSize = new mxRectangle(0, 0, 400, 400);
  transparentBackground = true;
  selectParentAfterDelete = false;
  defaultEdgeLength = 80;
  edgeMode = false;
  connectionArrowsEnabled = true;
  placeholderPattern = new RegExp('%(date\{.*\}|[^%^\{^\}]+)%', 'g');
  absoluteUrlPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
  defaultThemeName = 'default';
  defaultThemes = {};

  baseUrl = (urlParams['base'] != null) ?
      decodeURIComponent(urlParams['base']) :
      (((window != window.top) ? document.referrer :
      document.location.toString()).split('#')[0]);

  editAfterInsert = false;
  builtInProperties = ['label', 'tooltip', 'placeholders', 'placeholder'];

  init(container) {
      mxGraph.prototype.init.apply(this, arguments);

      // Intercepts links with no target attribute and opens in new window
      this.cellRenderer.initializeLabel = function(state, shape)
      {
          mxCellRenderer.prototype.initializeLabel.apply(this, arguments);
          
          // Checks tolerance for clicks on links
          var tol = state.view.graph.tolerance;
          var handleClick = true;
          var first = null;
          
          var down = evt => {
              handleClick = true;
              first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
          };
          
          var move = evt => {
              handleClick = handleClick && first != null &&
                  Math.abs(first.x - mxEvent.getClientX(evt)) < tol &&
                  Math.abs(first.y - mxEvent.getClientY(evt)) < tol;
          };
          
          var up = evt => {
              if (handleClick)
              {
                  var elt = mxEvent.getSource(evt)
                  
                  while (elt != null && elt != shape.node)
                  {
                      if (elt.nodeName.toLowerCase() == 'a')
                      {
                          state.view.graph.labelLinkClicked(state, elt, evt);
                          break;
                      }
                      
                      elt = elt.parentNode;
                  }
              }
          };
          
          mxEvent.addGestureListeners(shape.node, down, move, up);
          mxEvent.addListener(shape.node, 'click', function(evt)
          {
              mxEvent.consume(evt);
          });
      };
      
      this.initLayoutManager();
  }

  isLightboxView() {
      return this.lightbox;
  }

  labelLinkClicked(state, elt, evt) {
      var href = elt.getAttribute('href');
      
      if (href != null && !this.isCustomLink(href) && (mxEvent.isLeftMouseButton(evt) &&
          !mxEvent.isPopupTrigger(evt)) || mxEvent.isTouchEvent(evt))
      {
          if (!this.isEnabled() || this.isCellLocked(state.cell))
          {
              var target = this.isBlankLink(href) ? this.linkTarget : '_top';
              this.openLink(this.getAbsoluteUrl(href), target);
          }
          
          mxEvent.consume(evt);
      }
  }

  openLink(href, target, allowOpener) {
      var result = window;
      
      try
      {
          // Workaround for blocking in same iframe
          if (target == '_self' && window != window.top)
          {
              window.location.href = href;
          }
          else
          {
              // Avoids page reload for anchors (workaround for IE but used everywhere)
              if (href.substring(0, this.baseUrl.length) == this.baseUrl &&
                  href.charAt(this.baseUrl.length) == '#' &&
                  target == '_top' && window == window.top)
              {
                  var hash = href.split('#')[1];
      
                  // Forces navigation if on same hash
                  if (window.location.hash == '#' + hash)
                  {
                      window.location.hash = '';
                  }
                  
                  window.location.hash = hash;
              }
              else
              {
                  result = window.open(href, target);
      
                  if (result != null && !allowOpener)
                  {
                      result.opener = null;
                  }
              }
          }
      }
      catch (e)
      {
          // ignores permission denied
      }
      
      return result;
  }

  getLinkTitle(href) {
      return href.substring(href.lastIndexOf('/') + 1);
  }

  isCustomLink(href) {
      return href.substring(0, 5) == 'data:';
  }

  customLinkClicked(link) {
      return false;
  }

  isExternalProtocol(href) {
      return href.substring(0, 7) === 'mailto:';
  }

  isBlankLink(href) {
      return !this.isExternalProtocol(href) &&
          (this.linkPolicy === 'blank' ||
          (this.linkPolicy !== 'self' &&
          !this.isRelativeUrl(href) &&
          href.substring(0, this.domainUrl.length) !== this.domainUrl));
  }

  isRelativeUrl(url) {
      return url != null && !this.absoluteUrlPattern.test(url) &&
          url.substring(0, 5) !== 'data:' &&
          !this.isExternalProtocol(url);
  }

  getAbsoluteUrl(url) {
      if (url != null && this.isRelativeUrl(url))
      {
          if (url.charAt(0) == '#')
          {
              url = this.baseUrl + url;
          }
          else if (url.charAt(0) == '/')
          {
              url = this.domainUrl + url;
          }
          else
          {
              url = this.domainPathUrl + url;
          }
      }
      
      return url;
  }

  initLayoutManager() {
      this.layoutManager = new mxLayoutManager(this);

      this.layoutManager.getLayout = function(cell)
      {
          // Workaround for possible invalid style after change and before view validation
          var style = this.graph.getCellStyle(cell);
          
          if (style != null)
          {
              if (style['childLayout'] == 'stackLayout')
              {
                  var stackLayout = new mxStackLayout(this.graph, true);
                  stackLayout.resizeParentMax = mxUtils.getValue(style, 'resizeParentMax', '1') == '1';
                  stackLayout.horizontal = mxUtils.getValue(style, 'horizontalStack', '1') == '1';
                  stackLayout.resizeParent = mxUtils.getValue(style, 'resizeParent', '1') == '1';
                  stackLayout.resizeLast = mxUtils.getValue(style, 'resizeLast', '0') == '1';
                  stackLayout.spacing = style['stackSpacing'] || stackLayout.spacing;
                  stackLayout.border = style['stackBorder'] || stackLayout.border;
                  stackLayout.marginLeft = style['marginLeft'] || 0;
                  stackLayout.marginRight = style['marginRight'] || 0;
                  stackLayout.marginTop = style['marginTop'] || 0;
                  stackLayout.marginBottom = style['marginBottom'] || 0;
                  stackLayout.fill = true;
                  
                  return stackLayout;
              }
              else if (style['childLayout'] == 'treeLayout')
              {
                  var treeLayout = new mxCompactTreeLayout(this.graph);
                  treeLayout.horizontal = mxUtils.getValue(style, 'horizontalTree', '1') == '1';
                  treeLayout.resizeParent = mxUtils.getValue(style, 'resizeParent', '1') == '1';
                  treeLayout.groupPadding = mxUtils.getValue(style, 'parentPadding', 20);
                  treeLayout.levelDistance = mxUtils.getValue(style, 'treeLevelDistance', 30);
                  treeLayout.maintainParentLocation = true;
                  treeLayout.edgeRouting = false;
                  treeLayout.resetEdges = false;
                  
                  return treeLayout;
              }
              else if (style['childLayout'] == 'flowLayout')
              {
                  var flowLayout = new mxHierarchicalLayout(this.graph, mxUtils.getValue(style,
                          'flowOrientation', mxConstants.DIRECTION_EAST));
                  flowLayout.resizeParent = mxUtils.getValue(style, 'resizeParent', '1') == '1';
                  flowLayout.parentBorder = mxUtils.getValue(style, 'parentPadding', 20);
                  flowLayout.maintainParentLocation = true;
                  
                  // Special undocumented styles for changing the hierarchical
                  flowLayout.intraCellSpacing = mxUtils.getValue(style, 'intraCellSpacing', mxHierarchicalLayout.prototype.intraCellSpacing);
                  flowLayout.interRankCellSpacing = mxUtils.getValue(style, 'interRankCellSpacing', mxHierarchicalLayout.prototype.interRankCellSpacing);
                  flowLayout.interHierarchySpacing = mxUtils.getValue(style, 'interHierarchySpacing', mxHierarchicalLayout.prototype.interHierarchySpacing);
                  flowLayout.parallelEdgeSpacing = mxUtils.getValue(style, 'parallelEdgeSpacing', mxHierarchicalLayout.prototype.parallelEdgeSpacing);
                  
                  return flowLayout;
              }
          }
          
          return null;
      };
  }

  getPageSize() {
      return (this.pageVisible) ? new mxRectangle(0, 0, this.pageFormat.width * this.pageScale,
              this.pageFormat.height * this.pageScale) : this.scrollTileSize;
  }

  getPageLayout() {
      var size = this.getPageSize();
      var bounds = this.getGraphBounds();

      if (bounds.width == 0 || bounds.height == 0)
      {
          return new mxRectangle(0, 0, 1, 1);
      }
      else
      {
          // Computes untransformed graph bounds
          var x = Math.ceil(bounds.x / this.view.scale - this.view.translate.x);
          var y = Math.ceil(bounds.y / this.view.scale - this.view.translate.y);
          var w = Math.floor(bounds.width / this.view.scale);
          var h = Math.floor(bounds.height / this.view.scale);
          
          var x0 = Math.floor(x / size.width);
          var y0 = Math.floor(y / size.height);
          var w0 = Math.ceil((x + w) / size.width) - x0;
          var h0 = Math.ceil((y + h) / size.height) - y0;
          
          return new mxRectangle(x0, y0, w0, h0);
      }
  }

  sanitizeHtml(value, editing) {
      // Uses https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer
      // NOTE: Original minimized sanitizer was modified to support
      // data URIs for images, mailto and special data:-links.
      // LATER: Add MathML to whitelisted tags
      function urlX(link)
      {
          if (link != null && link.toString().toLowerCase().substring(0, 11) !== 'javascript:')
          {
              return link;
          }
          
          return null;
      };
      function idX(id) { return id };
      
      return html_sanitize(value, urlX, idX);
  }

  updatePlaceholders() {
      var model = this.model;
      var validate = false;
      
      for (var key in this.model.cells)
      {
          var cell = this.model.cells[key];
          
          if (this.isReplacePlaceholders(cell))
          {
              this.view.invalidate(cell, false, false);
              validate = true;
          }
      }
      
      if (validate)
      {
          this.view.validate();
      }
  }

  isReplacePlaceholders(cell) {
      return cell.value != null && typeof(cell.value) == 'object' &&
          cell.value.getAttribute('placeholders') == '1';
  }

  isZoomWheelEvent(evt) {
      return mxEvent.isAltDown(evt) || (mxEvent.isMetaDown(evt) && mxClient.IS_MAC) ||
          (mxEvent.isControlDown(evt) && !mxClient.IS_MAC);
  }

  isTransparentClickEvent(evt) {
      return mxEvent.isAltDown(evt);
  }

  isIgnoreTerminalEvent(evt) {
      return mxEvent.isShiftDown(evt) && mxEvent.isControlDown(evt);
  }

  isSplitTarget(target, cells, evt) {
      return !this.model.isEdge(cells[0]) &&
          !mxEvent.isAltDown(evt) && !mxEvent.isShiftDown(evt) &&
          mxGraph.prototype.isSplitTarget.apply(this, arguments);
  }

  getLabel(cell) {
      var result = mxGraph.prototype.getLabel.apply(this, arguments);
      
      if (result != null && this.isReplacePlaceholders(cell) && cell.getAttribute('placeholder') == null)
      {
          result = this.replacePlaceholders(cell, result);
      }
      
      return result;
  }

  isLabelMovable(cell) {
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
      
      return !this.isCellLocked(cell) &&
          ((this.model.isEdge(cell) && this.edgeLabelsMovable) ||
          (this.model.isVertex(cell) && (this.vertexLabelsMovable ||
          mxUtils.getValue(style, 'labelMovable', '0') == '1')));
  }

  setGridSize(value) {
      this.gridSize = value;
      this.fireEvent(new mxEventObject('gridSizeChanged'));
  }

  getGlobalVariable(name) {
      var val = null;
      
      if (name == 'date')
      {
          val = new Date().toLocaleDateString();
      }
      else if (name == 'time')
      {
          val = new Date().toLocaleTimeString();
      }
      else if (name == 'timestamp')
      {
          val = new Date().toLocaleString();
      }
      else if (name.substring(0, 5) == 'date{')
      {
          var fmt = name.substring(5, name.length - 1);
          val = this.formatDate(new Date(), fmt);
      }

      return val;
  }

  formatDate(date, mask, utc) {
      // LATER: Cache regexs
      if (this.dateFormatCache == null)
      {
          this.dateFormatCache = {
              i18n: {
                  dayNames: [
                      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                  ],
                  monthNames: [
                      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                  ]
              },
              
              masks: {
                  "default":      "ddd mmm dd yyyy HH:MM:ss",
                  shortDate:      "m/d/yy",
                  mediumDate:     "mmm d, yyyy",
                  longDate:       "mmmm d, yyyy",
                  fullDate:       "dddd, mmmm d, yyyy",
                  shortTime:      "h:MM TT",
                  mediumTime:     "h:MM:ss TT",
                  longTime:       "h:MM:ss TT Z",
                  isoDate:        "yyyy-mm-dd",
                  isoTime:        "HH:MM:ss",
                  isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
                  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
              }
          };
      }
      
      var dF = this.dateFormatCache;
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
          timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
          timezoneClip = /[^-+\dA-Z]/g,
          pad = function (val, len) {
              val = String(val);
              len = len || 2;
              while (val.length < len) val = "0" + val;
              return val;
          };

      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
      if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
          mask = date;
          date = undefined;
      }

      // Passing date through Date applies Date.parse, if necessary
      date = date ? new Date(date) : new Date;
      if (isNaN(date)) throw SyntaxError("invalid date");

      mask = String(dF.masks[mask] || mask || dF.masks["default"]);

      // Allow setting the utc argument via the mask
      if (mask.slice(0, 4) == "UTC:") {
          mask = mask.slice(4);
          utc = true;
      }

      var _ = utc ? "getUTC" : "get",
          d = date[_ + "Date"](),
          D = date[_ + "Day"](),
          m = date[_ + "Month"](),
          y = date[_ + "FullYear"](),
          H = date[_ + "Hours"](),
          M = date[_ + "Minutes"](),
          s = date[_ + "Seconds"](),
          L = date[_ + "Milliseconds"](),
          o = utc ? 0 : date.getTimezoneOffset(),
          flags = {
              d:    d,
              dd:   pad(d),
              ddd:  dF.i18n.dayNames[D],
              dddd: dF.i18n.dayNames[D + 7],
              m:    m + 1,
              mm:   pad(m + 1),
              mmm:  dF.i18n.monthNames[m],
              mmmm: dF.i18n.monthNames[m + 12],
              yy:   String(y).slice(2),
              yyyy: y,
              h:    H % 12 || 12,
              hh:   pad(H % 12 || 12),
              H:    H,
              HH:   pad(H),
              M:    M,
              MM:   pad(M),
              s:    s,
              ss:   pad(s),
              l:    pad(L, 3),
              L:    pad(L > 99 ? Math.round(L / 10) : L),
              t:    H < 12 ? "a"  : "p",
              tt:   H < 12 ? "am" : "pm",
              T:    H < 12 ? "A"  : "P",
              TT:   H < 12 ? "AM" : "PM",
              Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
              o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
              S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
          };

      return mask.replace(token, function ($0)
      {
          return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
  }

  createLayersDialog() {
      var div = document.createElement('div');
      div.style.position = 'absolute';
      
      var model = this.getModel();
      var childCount = model.getChildCount(model.root);
      
      for (var i = 0; i < childCount; i++)
      {
          ((layer => {
              var span = document.createElement('div');
              span.style.overflow = 'hidden';
              span.style.textOverflow = 'ellipsis';
              span.style.padding = '2px';
              span.style.whiteSpace = 'nowrap';

              var cb = document.createElement('input');
              cb.style.display = 'inline-block';
              cb.setAttribute('type', 'checkbox');
              
              if (model.isVisible(layer))
              {
                  cb.setAttribute('checked', 'checked');
                  cb.defaultChecked = true;
              }
              
              span.appendChild(cb);
              
              var title = this.convertValueToString(layer) || (mxResources.get('background') || 'Background');
              span.setAttribute('title', title);
              mxUtils.write(span, title);
              div.appendChild(span);
              
              mxEvent.addListener(cb, 'click', function()
              {
                  if (cb.getAttribute('checked') != null)
                  {
                      cb.removeAttribute('checked');
                  }
                  else
                  {
                      cb.setAttribute('checked', 'checked');
                  }
                  
                  model.setVisible(layer, cb.checked);
              });
          })(model.getChildAt(model.root, i)));
      }
      
      return div;
  }

  replacePlaceholders(cell, str) {
      var result = [];
      
      if (str != null)
      {
          var last = 0;
          
          while (match = this.placeholderPattern.exec(str))
          {
              var val = match[0];
              
              if (val.length > 2 && val != '%label%' && val != '%tooltip%')
              {
                  var tmp = null;
      
                  if (match.index > last && str.charAt(match.index - 1) == '%')
                  {
                      tmp = val.substring(1);
                  }
                  else
                  {
                      var name = val.substring(1, val.length - 1);
                      
                      // Workaround for invalid char for getting attribute in older versions of IE
                      if (name.indexOf('{') < 0)
                      {
                          var current = cell;
                          
                          while (tmp == null && current != null)
                          {
                              if (current.value != null && typeof(current.value) == 'object')
                              {
                                  tmp = (current.hasAttribute(name)) ? ((current.getAttribute(name) != null) ?
                                          current.getAttribute(name) : '') : null;
                              }
                              
                              current = this.model.getParent(current);
                          }
                      }
                      
                      if (tmp == null)
                      {
                          tmp = this.getGlobalVariable(name);
                      }
                  }
      
                  result.push(str.substring(last, match.index) + ((tmp != null) ? tmp : val));
                  last = match.index + val.length;
              }
          }
          
          result.push(str.substring(last));
      }

      return result.join('');
  }

  restoreSelection(cells) {
      if (cells != null && cells.length > 0)
      {
          var temp = [];

          for (var i = 0; i < cells.length; i++)
          {
              var newCell = this.model.getCell(cells[i].id);

              if (newCell != null)
              {
                  temp.push(newCell);
              }
          }

          this.setSelectionCells(temp);
      }
      else
      {
          this.clearSelection();
      }
  }

  selectCellsForConnectVertex(cells, evt, hoverIcons) {
      // Selects only target vertex if one exists
      if (cells.length == 2 && this.model.isVertex(cells[1]))
      {
          this.setSelectionCell(cells[1]);
          
          if (hoverIcons != null)
          {
              // Adds hover icons to new target vertex for touch devices
              if (mxEvent.isTouchEvent(evt))
              {
                  hoverIcons.update(hoverIcons.getState(this.view.getState(cells[1])));
              }
              else
              {
                  // Hides hover icons after click with mouse
                  hoverIcons.reset();
              }
          }
          
          this.scrollCellToVisible(cells[1]);
      }
      else
      {
          this.setSelectionCells(cells);
      }
  }

  connectVertex(source, direction, length, evt, forceClone, ignoreCellAt) {
      // Ignores relative edge labels
      if (source.geometry.relative && this.model.isEdge(source.parent))
      {
          return [];
      }
      
      ignoreCellAt = (ignoreCellAt) ? ignoreCellAt : false;
      
      var pt = (source.geometry.relative && source.parent.geometry != null) ?
              new mxPoint(source.parent.geometry.width * source.geometry.x, source.parent.geometry.height * source.geometry.y) :
              new mxPoint(source.geometry.x, source.geometry.y);
          
      if (direction == mxConstants.DIRECTION_NORTH)
      {
          pt.x += source.geometry.width / 2;
          pt.y -= length ;
      }
      else if (direction == mxConstants.DIRECTION_SOUTH)
      {
          pt.x += source.geometry.width / 2;
          pt.y += source.geometry.height + length;
      }
      else if (direction == mxConstants.DIRECTION_WEST)
      {
          pt.x -= length;
          pt.y += source.geometry.height / 2;
      }
      else
      {
          pt.x += source.geometry.width + length;
          pt.y += source.geometry.height / 2;
      }

      var parentState = this.view.getState(this.model.getParent(source));
      var s = this.view.scale;
      var t = this.view.translate;
      var dx = t.x * s;
      var dy = t.y * s;
      
      if (parentState != null && this.model.isVertex(parentState.cell))
      {
          dx = parentState.x;
          dy = parentState.y;
      }

      // Workaround for relative child cells
      if (this.model.isVertex(source.parent) && source.geometry.relative)
      {
          pt.x += source.parent.geometry.x;
          pt.y += source.parent.geometry.y;
      }
      
      // Checks actual end point of edge for target cell
      var target = (ignoreCellAt || (mxEvent.isControlDown(evt) && !forceClone)) ?
          null : this.getCellAt(dx + pt.x * s, dy + pt.y * s);
      
      if (this.model.isAncestor(target, source))
      {
          target = null;
      }
      
      // Checks if target or ancestor is locked
      var temp = target;
      
      while (temp != null)
      {
          if (this.isCellLocked(temp))
          {
              target = null;
              break;
          }
          
          temp = this.model.getParent(temp);
      }
      
      // Checks if source and target intersect
      if (target != null)
      {
          var sourceState = this.view.getState(source);
          var targetState = this.view.getState(target);
          
          if (sourceState != null && targetState != null && mxUtils.intersects(sourceState, targetState))
          {
              target = null;
          }
      }
      
      var duplicate = !mxEvent.isShiftDown(evt) || forceClone;
      
      if (duplicate)
      {
          if (direction == mxConstants.DIRECTION_NORTH)
          {
              pt.y -= source.geometry.height / 2;
          }
          else if (direction == mxConstants.DIRECTION_SOUTH)
          {
              pt.y += source.geometry.height / 2;
          }
          else if (direction == mxConstants.DIRECTION_WEST)
          {
              pt.x -= source.geometry.width / 2;
          }
          else
          {
              pt.x += source.geometry.width / 2;
          }
      }

      // Uses connectable parent vertex if one exists
      if (target != null && !this.isCellConnectable(target))
      {
          var parent = this.getModel().getParent(target);
          
          if (this.getModel().isVertex(parent) && this.isCellConnectable(parent))
          {
              target = parent;
          }
      }
      
      if (target == source || this.model.isEdge(target) || !this.isCellConnectable(target))
      {
          target = null;
      }
      
      var result = [];
      
      this.model.beginUpdate();
      try
      {
          var realTarget = target;
          
          if (realTarget == null && duplicate)
          {
              // Handles relative children
              var cellToClone = source;
              var geo = this.getCellGeometry(source);
              
              while (geo != null && geo.relative)
              {
                  cellToClone = this.getModel().getParent(cellToClone);
                  geo = this.getCellGeometry(cellToClone);
              }
              
              // Handle consistuents for cloning
              var state = this.view.getState(cellToClone);
              var style = (state != null) ? state.style : this.getCellStyle(cellToClone);
              
              if (mxUtils.getValue(style, 'part', false))
              {
                  var tmpParent = this.model.getParent(cellToClone);

                  if (this.model.isVertex(tmpParent))
                  {
                      cellToClone = tmpParent;
                  }
              }
              
              realTarget = this.duplicateCells([cellToClone], false)[0];
              
              var geo = this.getCellGeometry(realTarget);
              
              if (geo != null)
              {
                  geo.x = pt.x - geo.width / 2;
                  geo.y = pt.y - geo.height / 2;
              }
          }
          
          // Never connects children in stack layouts
          var layout = null;

          if (this.layoutManager != null)
          {
              layout = this.layoutManager.getLayout(this.model.getParent(source));
          }
          
          var edge = ((mxEvent.isControlDown(evt) && duplicate) || (target == null && layout != null && layout.constructor == mxStackLayout)) ? null :
              this.insertEdge(this.model.getParent(source), null, '', source, realTarget, this.createCurrentEdgeStyle());

          // Inserts edge before source
          if (edge != null && this.connectionHandler.insertBeforeSource)
          {
              var index = null;
              var tmp = source;
              
              while (tmp.parent != null && tmp.geometry != null &&
                  tmp.geometry.relative && tmp.parent != edge.parent)
              {
                  tmp = this.model.getParent(tmp);
              }
          
              if (tmp != null && tmp.parent != null && tmp.parent == edge.parent)
              {
                  var index = tmp.parent.getIndex(tmp);
                  this.model.add(tmp.parent, edge, index);
              }
          }
          
          // Special case: Click on west icon puts clone before cell
          if (target == null && realTarget != null && layout != null && source.parent != null &&
              layout.constructor == mxStackLayout && direction == mxConstants.DIRECTION_WEST)
          {
              var index = source.parent.getIndex(source);
              this.model.add(source.parent, realTarget, index);
          }
          
          if (edge != null)
          {
              result.push(edge);
          }
          
          if (target == null && realTarget != null)
          {
              result.push(realTarget);
          }
          
          if (realTarget == null && edge != null)
          {
              edge.geometry.setTerminalPoint(pt, false);
          }
          
          if (edge != null)
          {
              this.fireEvent(new mxEventObject('cellsInserted', 'cells', [edge]));
          }
      }
      finally
      {
          this.model.endUpdate();
      }
      
      return result;
  }

  getIndexableText() {
      var tmp = document.createElement('div');
      var labels = [];
      var label = '';
      
      for (var key in this.model.cells)
      {
          var cell = this.model.cells[key];
          
          if (this.model.isVertex(cell) || this.model.isEdge(cell))
          {
              if (this.isHtmlLabel(cell))
              {
                  tmp.innerHTML = this.getLabel(cell);
                  label = mxUtils.extractTextWithWhitespace([tmp]);
              }
              else
              {					
                  label = this.getLabel(cell);
              }

              label = mxUtils.trim(label.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, ' '));
              
              if (label.length > 0)
              {
                  labels.push(label);
              }
          }
      }
      
      return labels.join(' ');
  }

  convertValueToString(cell) {
      if (cell.value != null && typeof(cell.value) == 'object')
      {
          if (this.isReplacePlaceholders(cell) && cell.getAttribute('placeholder') != null)
          {
              var name = cell.getAttribute('placeholder');
              var current = cell;
              var result = null;
                      
              while (result == null && current != null)
              {
                  if (current.value != null && typeof(current.value) == 'object')
                  {
                      result = (current.hasAttribute(name)) ? ((current.getAttribute(name) != null) ?
                              current.getAttribute(name) : '') : null;
                  }
                  
                  current = this.model.getParent(current);
              }
              
              return result || '';
          }
          else
          {	
              return cell.value.getAttribute('label') || '';
          }
      }
      
      return mxGraph.prototype.convertValueToString.apply(this, arguments);
  }

  getLinksForState(state) {
      if (state != null && state.text != null && state.text.node != null)
      {
          return state.text.node.getElementsByTagName('a');
      }
      
      return null;
  }

  getLinkForCell(cell) {
      if (cell.value != null && typeof(cell.value) == 'object')
      {
          var link = cell.value.getAttribute('link');
          
          // Removes links with leading javascript: protocol
          // TODO: Check more possible attack vectors
          if (link != null && link.toLowerCase().substring(0, 11) === 'javascript:')
          {
              link = link.substring(11);
          }
          
          return link;
      }
      
      return null;
  }

  getCellStyle(cell) {
      var style = mxGraph.prototype.getCellStyle.apply(this, arguments);
      
      if (cell != null && this.layoutManager != null)
      {
          var parent = this.model.getParent(cell);
          
          if (this.model.isVertex(parent) && this.isCellCollapsed(cell))
          {
              var layout = this.layoutManager.getLayout(parent);
              
              if (layout != null && layout.constructor == mxStackLayout)
              {
                  style[mxConstants.STYLE_HORIZONTAL] = !layout.horizontal;
              }
          }
      }
      
      return style;
  }

  updateAlternateBounds(cell, geo, willCollapse) {
      if (cell != null && geo != null && this.layoutManager != null && geo.alternateBounds != null)
      {
          var layout = this.layoutManager.getLayout(this.model.getParent(cell));
          
          if (layout != null && layout.constructor == mxStackLayout)
          {
              if (layout.horizontal)
              {
                  geo.alternateBounds.height = 0;
              }
              else
              {
                  geo.alternateBounds.width = 0;
              }
          }
      }
      
      mxGraph.prototype.updateAlternateBounds.apply(this, arguments);
  }

  isMoveCellsEvent(evt) {
      return mxEvent.isShiftDown(evt);
  }

  foldCells(collapse, recurse, cells, checkFoldable, evt) {
      recurse = (recurse != null) ? recurse : false;
      
      if (cells == null)
      {
          cells = this.getFoldableCells(this.getSelectionCells(), collapse);
      }
      
      if (cells != null)
      {
          this.model.beginUpdate();
          
          try
          {
              mxGraph.prototype.foldCells.apply(this, arguments);
              
              // Resizes all parent stacks if alt is not pressed
              if (this.layoutManager != null)
              {
                  for (var i = 0; i < cells.length; i++)
                  {
                      var state = this.view.getState(cells[i]);
                      var geo = this.getCellGeometry(cells[i]);
                      
                      if (state != null && geo != null)
                      {
                          var dx = Math.round(geo.width - state.width / this.view.scale);
                          var dy = Math.round(geo.height - state.height / this.view.scale);
                          
                          if (dy != 0 || dx != 0)
                          {
                              var parent = this.model.getParent(cells[i]);
                              var layout = this.layoutManager.getLayout(parent);
                              
                              if (layout == null)
                              {
                                  // Moves cells to the right and down after collapse/expand
                                  if (evt != null && this.isMoveCellsEvent(evt))
                                  {
                                      this.moveSiblings(state, parent, dx, dy);
                                  } 
                              }
                              else if ((evt == null || !mxEvent.isAltDown(evt)) && layout.constructor == mxStackLayout && !layout.resizeLast)
                              {
                                  this.resizeParentStacks(parent, layout, dx, dy);
                              }
                          }
                      }
                  }
              }
          }
          finally
          {
              this.model.endUpdate();
          }
          
          // Selects cells after folding
          if (this.isEnabled())
          {
              this.setSelectionCells(cells);
          }
      }
  }

  moveSiblings(state, parent, dx, dy) {
      this.model.beginUpdate();
      try
      {
          var cells = this.getCellsBeyond(state.x, state.y, parent, true, true);
          
          for (var i = 0; i < cells.length; i++)
          {
              if (cells[i] != state.cell)
              {
                  var tmp = this.view.getState(cells[i]);
                  var geo = this.getCellGeometry(cells[i]);
                  
                  if (tmp != null && geo != null)
                  {
                      geo = geo.clone();
                      geo.translate(Math.round(dx * Math.max(0, Math.min(1, (tmp.x - state.x) / state.width))),
                          Math.round(dy * Math.max(0, Math.min(1, (tmp.y - state.y) / state.height))));
                      this.model.setGeometry(cells[i], geo);
                  }
              }
          }
      }
      finally
      {
          this.model.endUpdate();
      }
  }

  resizeParentStacks(parent, layout, dx, dy) {
      if (this.layoutManager != null && layout != null && layout.constructor == mxStackLayout && !layout.resizeLast)
      {
          this.model.beginUpdate();
          try
          {
              var dir = layout.horizontal;
              
              // Bubble resize up for all parent stack layouts with same orientation
              while (parent != null && layout != null && layout.constructor == mxStackLayout &&
                  layout.horizontal == dir && !layout.resizeLast)
              {
                  var pgeo = this.getCellGeometry(parent);
                  var pstate = this.view.getState(parent);
                  
                  if (pstate != null && pgeo != null)
                  {
                      pgeo = pgeo.clone();
                      
                      if (layout.horizontal)
                      {
                          pgeo.width += dx + Math.min(0, pstate.width / this.view.scale - pgeo.width);									
                      }
                      else
                      {
                          pgeo.height += dy + Math.min(0, pstate.height / this.view.scale - pgeo.height);
                      }
          
                      this.model.setGeometry(parent, pgeo);
                  }
                  
                  parent = this.model.getParent(parent);
                  layout = this.layoutManager.getLayout(parent);
              }
          }
          finally
          {
              this.model.endUpdate();
          }
      }
  }

  isContainer(cell) {
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
      
      if (this.isSwimlane(cell))
      {
          return style['container'] != '0';
      }
      else
      {
          return style['container'] == '1';
      }
  }

  isCellConnectable(cell) {
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
      
      return (style != null && style['connectable'] != null) ? style['connectable'] != '0' :
          mxGraph.prototype.isCellConnectable.apply(this, arguments);
  }

  selectAll(parent) {
      parent = parent || this.getDefaultParent();

      if (!this.isCellLocked(parent))
      {
          mxGraph.prototype.selectAll.apply(this, arguments);
      }
  }

  selectCells(vertices, edges, parent) {
      parent = parent || this.getDefaultParent();

      if (!this.isCellLocked(parent))
      {
          mxGraph.prototype.selectCells.apply(this, arguments);
      }
  }

  getSwimlaneAt(x, y, parent) {
      parent = parent || this.getDefaultParent();

      if (!this.isCellLocked(parent))
      {
          return mxGraph.prototype.getSwimlaneAt.apply(this, arguments);
      }
      
      return null;
  }

  isCellFoldable(cell) {
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
      
      return this.foldingEnabled && (style['treeFolding'] == '1' ||
          (!this.isCellLocked(cell) &&
          ((this.isContainer(cell) && style['collapsible'] != '0') ||
          (!this.isContainer(cell) && style['collapsible'] == '1'))));
  }

  reset() {
      if (this.isEditing())
      {
          this.stopEditing(true);
      }
      
      this.escape();
                      
      if (!this.isSelectionEmpty())
      {
          this.clearSelection();
      }
  }

  zoom(factor, center) {
      factor = Math.max(0.01, Math.min(this.view.scale * factor, 160)) / this.view.scale;
      
      mxGraph.prototype.zoom.apply(this, arguments);
  }

  zoomIn() {
      // Switches to 1% zoom steps below 15%
      if (this.view.scale < 0.15)
      {
          this.zoom((this.view.scale + 0.01) / this.view.scale);
      }
      else
      {
          // Uses to 5% zoom steps for better grid rendering in webkit
          // and to avoid rounding errors for zoom steps
          this.zoom((Math.round(this.view.scale * this.zoomFactor * 20) / 20) / this.view.scale);
      }
  }

  zoomOut() {
      // Switches to 1% zoom steps below 15%
      if (this.view.scale <= 0.15)
      {
          this.zoom((this.view.scale - 0.01) / this.view.scale);
      }
      else
      {
          // Uses to 5% zoom steps for better grid rendering in webkit
          // and to avoid rounding errors for zoom steps
          this.zoom((Math.round(this.view.scale * (1 / this.zoomFactor) * 20) / 20) / this.view.scale);
      }
  }

  getTooltipForCell(cell) {
      var tip = '';
      
      if (mxUtils.isNode(cell.value))
      {
          var tmp = cell.value.getAttribute('tooltip');
          
          if (tmp != null)
          {
              if (tmp != null && this.isReplacePlaceholders(cell))
              {
                  tmp = this.replacePlaceholders(cell, tmp);
              }
              
              tip = this.sanitizeHtml(tmp);
          }
          else
          {
              var ignored = this.builtInProperties;
              var attrs = cell.value.attributes;
              var temp = [];

              // Hides links in edit mode
              if (this.isEnabled())
              {
                  ignored.push('link');
              }
              
              for (var i = 0; i < attrs.length; i++)
              {
                  if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 && attrs[i].nodeValue.length > 0)
                  {
                      temp.push({name: attrs[i].nodeName, value: attrs[i].nodeValue});
                  }
              }
              
              // Sorts by name
              temp.sort(function(a, b)
              {
                  if (a.name < b.name)
                  {
                      return -1;
                  }
                  else if (a.name > b.name)
                  {
                      return 1;
                  }
                  else
                  {
                      return 0;
                  }
              });

              for (var i = 0; i < temp.length; i++)
              {
                  if (temp[i].name != 'link' || !this.isCustomLink(temp[i].value))
                  {
                      tip += ((temp[i].name != 'link') ? '<b>' + temp[i].name + ':</b> ' : '') +
                          mxUtils.htmlEntities(temp[i].value) + '\n';
                  }
              }
              
              if (tip.length > 0)
              {
                  tip = tip.substring(0, tip.length - 1);
                  
                  if (mxClient.IS_SVG)
                  {
                      tip = '<div style="max-width:360px;">' + tip + '</div>';
                  }
              }
          }
      }
      
      return tip;
  }

  stringToBytes(str) {
      return Graph.stringToBytes(str);
  }

  bytesToString(arr) {
      return Graph.bytesToString(arr);
  }

  compressNode(node) {
      return Graph.compressNode(node);
  }

  compress(data, deflate) {
      return Graph.compress(data, deflate);
  }

  decompress(data, inflate) {
      return Graph.decompress(data, inflate);
  }

  zapGremlins(text) {
      return Graph.zapGremlins(text);
  }

  defaultVertexStyle = {};

  defaultEdgeStyle = {'edgeStyle': 'orthogonalEdgeStyle', 'rounded': '0',
      'jettySize': 'auto', 'orthogonalLoop': '1'};

  createCurrentEdgeStyle() {
      var style = 'edgeStyle=' + (this.currentEdgeStyle['edgeStyle'] || 'none') + ';';
      
      if (this.currentEdgeStyle['shape'] != null)
      {
          style += 'shape=' + this.currentEdgeStyle['shape'] + ';';
      }
      
      if (this.currentEdgeStyle['curved'] != null)
      {
          style += 'curved=' + this.currentEdgeStyle['curved'] + ';';
      }
      
      if (this.currentEdgeStyle['rounded'] != null)
      {
          style += 'rounded=' + this.currentEdgeStyle['rounded'] + ';';
      }

      if (this.currentEdgeStyle['comic'] != null)
      {
          style += 'comic=' + this.currentEdgeStyle['comic'] + ';';
      }

      if (this.currentEdgeStyle['jumpStyle'] != null)
      {
          style += 'jumpStyle=' + this.currentEdgeStyle['jumpStyle'] + ';';
      }

      if (this.currentEdgeStyle['jumpSize'] != null)
      {
          style += 'jumpSize=' + this.currentEdgeStyle['jumpSize'] + ';';
      }

      // Overrides the global default to match the default edge style
      if (this.currentEdgeStyle['orthogonalLoop'] != null)
      {
          style += 'orthogonalLoop=' + this.currentEdgeStyle['orthogonalLoop'] + ';';
      }
      else if (Graph.prototype.defaultEdgeStyle['orthogonalLoop'] != null)
      {
          style += 'orthogonalLoop=' + Graph.prototype.defaultEdgeStyle['orthogonalLoop'] + ';';
      }

      // Overrides the global default to match the default edge style
      if (this.currentEdgeStyle['jettySize'] != null)
      {
          style += 'jettySize=' + this.currentEdgeStyle['jettySize'] + ';';
      }
      else if (Graph.prototype.defaultEdgeStyle['jettySize'] != null)
      {
          style += 'jettySize=' + Graph.prototype.defaultEdgeStyle['jettySize'] + ';';
      }
      
      // Special logic for custom property of elbowEdgeStyle
      if (this.currentEdgeStyle['edgeStyle'] == 'elbowEdgeStyle' && this.currentEdgeStyle['elbow'] != null)
      {
          style += 'elbow=' + this.currentEdgeStyle['elbow'] + ';';
      }
      
      if (this.currentEdgeStyle['html'] != null)
      {
          style += 'html=' + this.currentEdgeStyle['html'] + ';';
      }
      else
      {
          style += 'html=1;';
      }
      
      return style;
  }

  getPagePadding() {
      return new mxPoint(0, 0);
  }

  loadStylesheet() {
      var node = (this.themes != null) ? this.themes[this.defaultThemeName] :
          (!mxStyleRegistry.dynamicLoading) ? null :
          mxUtils.load(STYLE_PATH + '/default.xml').getDocumentElement();
      
      if (node != null)
      {
          var dec = new mxCodec(node.ownerDocument);
          dec.decode(node, this.getStylesheet());
      }
  }

  importGraphModel(node, dx, dy, crop) {
      dx = (dx != null) ? dx : 0;
      dy = (dy != null) ? dy : 0;
      
      var codec = new mxCodec(node.ownerDocument);
      var tempModel = new mxGraphModel();
      codec.decode(node, tempModel);
      var cells = []
      
      // Clones cells to remove invalid edges
      var layers = tempModel.getChildren(this.cloneCell(
          tempModel.root, this.isCloneInvalidEdges()));
      
      if (layers != null)
      {
          // Uses copy as layers are removed from array inside loop
          layers = layers.slice();

          this.model.beginUpdate();
          try
          {
              // Merges into unlocked current layer if one layer is pasted
              if (layers.length == 1 && !this.isCellLocked(this.getDefaultParent()))
              {
                  cells = this.moveCells(tempModel.getChildren(layers[0]),
                      dx, dy, false, this.getDefaultParent());
              }
              else
              {
                  for (var i = 0; i < layers.length; i++)
                  {
                      cells = cells.concat(this.model.getChildren(this.moveCells(
                          [layers[i]], dx, dy, false, this.model.getRoot())[0]));
                  }
              }
              
              if (crop)
              {
                  if (this.isGridEnabled())
                  {
                      dx = this.snap(dx);
                      dy = this.snap(dy);
                  }
                  
                  var bounds = this.getBoundingBoxFromGeometry(cells, true);
                  
                  if (bounds != null)
                  {
                      this.moveCells(cells, dx - bounds.x, dy - bounds.y);
                  }
              }
          }
          finally
          {
              this.model.endUpdate();
          }
      }
      
      return cells;
  }

  getAllConnectionConstraints(terminal, source) {
      if (terminal != null)
      {
          var constraints = mxUtils.getValue(terminal.style, 'points', null);
          
          if (constraints != null)
          {
              // Requires an array of arrays with x, y (0..1), an optional
              // [perimeter (0 or 1), dx, and dy] eg. points=[[0,0,1,-10,10],[0,1,0],[1,1]]
              var result = [];
              
              try
              {
                  var c = JSON.parse(constraints);
                  
                  for (var i = 0; i < c.length; i++)
                  {
                      var tmp = c[i];
                      result.push(new mxConnectionConstraint(new mxPoint(tmp[0], tmp[1]), (tmp.length > 2) ? tmp[2] != '0' : true,
                              null, (tmp.length > 3) ? tmp[3] : 0, (tmp.length > 4) ? tmp[4] : 0));
                  }
              }
              catch (e)
              {
                  // ignore
              }
              
              return result;
          }
          else if (terminal.shape != null && terminal.shape.bounds != null)
          {
              var dir = terminal.shape.direction;
              var bounds = terminal.shape.bounds;
              var scale = terminal.shape.scale;
              var w = bounds.width / scale;
              var h = bounds.height / scale;
              
              if (dir == mxConstants.DIRECTION_NORTH || dir == mxConstants.DIRECTION_SOUTH)
              {
                  var tmp = w;
                  w = h;
                  h = tmp;
              }
              
              constraints = terminal.shape.getConstraints(terminal.style, w, h);
              
              if (constraints != null)
              {
                  return constraints;
              }
              else if (terminal.shape.stencil != null && terminal.shape.stencil.constraints != null)
              {
                  return terminal.shape.stencil.constraints;
              }
              else if (terminal.shape.constraints != null)
              {
                  return terminal.shape.constraints;
              }
          }
      }
  
      return null;
  }

  flipEdge(edge) {
      if (edge != null)
      {
          var state = this.view.getState(edge);
          var style = (state != null) ? state.style : this.getCellStyle(edge);
          
          if (style != null)
          {
              var elbow = mxUtils.getValue(style, mxConstants.STYLE_ELBOW,
                  mxConstants.ELBOW_HORIZONTAL);
              var value = (elbow == mxConstants.ELBOW_HORIZONTAL) ?
                  mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
              this.setCellStyles(mxConstants.STYLE_ELBOW, value, [edge]);
          }
      }
  }

  isValidRoot(cell) {
      // Counts non-relative children
      var childCount = this.model.getChildCount(cell);
      var realChildCount = 0;
      
      for (var i = 0; i < childCount; i++)
      {
          var child = this.model.getChildAt(cell, i);
          
          if (this.model.isVertex(child))
          {
              var geometry = this.getCellGeometry(child);
              
              if (geometry != null && !geometry.relative)
              {
                  realChildCount++;
              }
          }
      }
      
      return realChildCount > 0 || this.isContainer(cell);
  }

  isValidDropTarget(cell) {
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
  
      return mxUtils.getValue(style, 'part', '0') != '1' && (this.isContainer(cell) ||
          (mxGraph.prototype.isValidDropTarget.apply(this, arguments) &&
          mxUtils.getValue(style, 'dropTarget', '1') != '0'));
  }

  createGroupCell() {
      var group = mxGraph.prototype.createGroupCell.apply(this, arguments);
      group.setStyle('group');
      
      return group;
  }

  isExtendParentsOnAdd(cell) {
      var result = mxGraph.prototype.isExtendParentsOnAdd.apply(this, arguments);
      
      if (result && cell != null && this.layoutManager != null)
      {
          var parent = this.model.getParent(cell);
          
          if (parent != null)
          {
              var layout = this.layoutManager.getLayout(parent);
              
              if (layout != null && layout.constructor == mxStackLayout)
              {
                  result = false;
              }
          }
      }
      
      return result;
  }

  getPreferredSizeForCell(cell) {
      var result = mxGraph.prototype.getPreferredSizeForCell.apply(this, arguments);
      
      // Adds buffer
      if (result != null)
      {
          result.width += 10;
          result.height += 4;
          
          if (this.gridEnabled)
          {
              result.width = this.snap(result.width);
              result.height = this.snap(result.height);
          }
      }
      
      return result;
  }

  turnShapes(cells) {
      var model = this.getModel();
      var select = [];
      
      model.beginUpdate();
      try
      {
          for (var i = 0; i < cells.length; i++)
          {
              var cell = cells[i];
              
              if (model.isEdge(cell))
              {
                  var src = model.getTerminal(cell, true);
                  var trg = model.getTerminal(cell, false);
                  
                  model.setTerminal(cell, trg, true);
                  model.setTerminal(cell, src, false);
                  
                  var geo = model.getGeometry(cell);
                  
                  if (geo != null)
                  {
                      geo = geo.clone();
                      
                      if (geo.points != null)
                      {
                          geo.points.reverse();
                      }
                      
                      var sp = geo.getTerminalPoint(true);
                      var tp = geo.getTerminalPoint(false)
                      
                      geo.setTerminalPoint(sp, false);
                      geo.setTerminalPoint(tp, true);
                      model.setGeometry(cell, geo);
                      
                      // Inverts constraints
                      var edgeState = this.view.getState(cell);
                      var sourceState = this.view.getState(src);
                      var targetState = this.view.getState(trg);
                      
                      if (edgeState != null)
                      {
                          var sc = (sourceState != null) ? this.getConnectionConstraint(edgeState, sourceState, true) : null;
                          var tc = (targetState != null) ? this.getConnectionConstraint(edgeState, targetState, false) : null;
                          
                          this.setConnectionConstraint(cell, src, true, tc);
                          this.setConnectionConstraint(cell, trg, false, sc);
                      }
  
                      select.push(cell);
                  }
              }
              else if (model.isVertex(cell))
              {
                  var geo = this.getCellGeometry(cell);
      
                  if (geo != null)
                  {
                      // Rotates the size and position in the geometry
                      geo = geo.clone();
                      geo.x += geo.width / 2 - geo.height / 2;
                      geo.y += geo.height / 2 - geo.width / 2;
                      var tmp = geo.width;
                      geo.width = geo.height;
                      geo.height = tmp;
                      model.setGeometry(cell, geo);
                      
                      // Reads the current direction and advances by 90 degrees
                      var state = this.view.getState(cell);
                      
                      if (state != null)
                      {
                          var dir = state.style[mxConstants.STYLE_DIRECTION] || 'east'/*default*/;
                          
                          if (dir == 'east')
                          {
                              dir = 'south';
                          }
                          else if (dir == 'south')
                          {
                              dir = 'west';
                          }
                          else if (dir == 'west')
                          {
                              dir = 'north';
                          }
                          else if (dir == 'north')
                          {
                              dir = 'east';
                          }
                          
                          this.setCellStyles(mxConstants.STYLE_DIRECTION, dir, [cell]);
                      }
  
                      select.push(cell);
                  }
              }
          }
      }
      finally
      {
          model.endUpdate();
      }
      
      return select;
  }

  stencilHasPlaceholders(stencil) {
      if (stencil != null && stencil.fgNode != null)
      {
          var node = stencil.fgNode.firstChild;
          
          while (node != null)
          {
              if (node.nodeName == 'text' && node.getAttribute('placeholders') == '1')
              {
                  return true;
              }
              
              node = node.nextSibling;
          }
      }
      
      return false;
  }

  processChange(change) {
      mxGraph.prototype.processChange.apply(this, arguments);
      
      if (change instanceof mxValueChange && change.cell != null &&
          change.cell.value != null && typeof(change.cell.value) == 'object')
      {
          // Invalidates all descendants with placeholders
          var desc = this.model.getDescendants(change.cell);
          
          // LATER: Check if only label or tooltip have changed
          if (desc.length > 0)
          {
              for (var i = 0; i < desc.length; i++)
              {
                  var state = this.view.getState(desc[i]);
                  
                  if (state != null && state.shape != null && state.shape.stencil != null &&
                      this.stencilHasPlaceholders(state.shape.stencil))
                  {
                      this.removeStateForCell(desc[i]);
                  }
                  else if (this.isReplacePlaceholders(desc[i]))
                  {
                      this.view.invalidate(desc[i], false, false);
                  }
              }
          }
      }
  }

  replaceElement(elt, tagName) {
      var span = elt.ownerDocument.createElement((tagName != null) ? tagName : 'span');
      var attributes = Array.prototype.slice.call(elt.attributes);
      
      while (attr = attributes.pop())
      {
          span.setAttribute(attr.nodeName, attr.nodeValue);
      }
      
      span.innerHTML = elt.innerHTML;
      elt.parentNode.replaceChild(span, elt);
  }

  processElements(elt, fn) {
      var elts = elt.getElementsByTagName('*');
      
      for (var i = 0; i < elts.length; i++)
      {
          fn(elts[i]);
      }
  }

  updateLabelElements(cells, fn, tagName) {
      cells = (cells != null) ? cells : this.getSelectionCells();
      var div = document.createElement('div');
      
      for (var i = 0; i < cells.length; i++)
      {
          // Changes font tags inside HTML labels
          if (this.isHtmlLabel(cells[i]))
          {
              var label = this.convertValueToString(cells[i]);
              
              if (label != null && label.length > 0)
              {
                  div.innerHTML = label;
                  var elts = div.getElementsByTagName((tagName != null) ? tagName : '*');
                  
                  for (var j = 0; j < elts.length; j++)
                  {
                      fn(elts[j]);
                  }
                  
                  if (div.innerHTML != label)
                  {
                      this.cellLabelChanged(cells[i], div.innerHTML);
                  }
              }
          }
      }
  }

  cellLabelChanged(cell, value, autoSize) {
      // Removes all illegal control characters in user input
      value = Graph.zapGremlins(value);

      this.model.beginUpdate();
      try
      {			
          if (cell.value != null && typeof cell.value == 'object')
          {
              if (this.isReplacePlaceholders(cell) &&
                  cell.getAttribute('placeholder') != null)
              {
                  // LATER: Handle delete, name change
                  var name = cell.getAttribute('placeholder');
                  var current = cell;
                          
                  while (current != null)
                  {
                      if (current == this.model.getRoot() || (current.value != null &&
                          typeof(current.value) == 'object' && current.hasAttribute(name)))
                      {
                          this.setAttributeForCell(current, name, value);
                          
                          break;
                      }
                      
                      current = this.model.getParent(current);
                  }
              }
              
              var tmp = cell.value.cloneNode(true);
              tmp.setAttribute('label', value);
              value = tmp;
          }

          mxGraph.prototype.cellLabelChanged.apply(this, arguments);
      }
      finally
      {
          this.model.endUpdate();
      }
  }

  cellsRemoved(cells) {
      if (cells != null)
      {
          var dict = new mxDictionary();
          
          for (var i = 0; i < cells.length; i++)
          {
              dict.put(cells[i], true);
          }
          
          // LATER: Recurse up the cell hierarchy
          var parents = [];
          
          for (var i = 0; i < cells.length; i++)
          {
              var parent = this.model.getParent(cells[i]);

              if (parent != null && !dict.get(parent))
              {
                  dict.put(parent, true);
                  parents.push(parent);
              }
          }
          
          for (var i = 0; i < parents.length; i++)
          {
              var state = this.view.getState(parents[i]);
              
              if (state != null && (this.model.isEdge(state.cell) || this.model.isVertex(state.cell)) && this.isCellDeletable(state.cell))
              {
                  var stroke = mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE);
                  var fill = mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
                  
                  if (stroke == mxConstants.NONE && fill == mxConstants.NONE)
                  {
                      var allChildren = true;
                      
                      for (var j = 0; j < this.model.getChildCount(state.cell) && allChildren; j++)
                      {
                          if (!dict.get(this.model.getChildAt(state.cell, j)))
                          {
                              allChildren = false;
                          }
                      }
                      
                      if (allChildren)
                      {
                          cells.push(state.cell);
                      }
                  }
              }
          }
      }
      
      mxGraph.prototype.cellsRemoved.apply(this, arguments);
  }

  removeCellsAfterUngroup(cells) {
      var cellsToRemove = [];
      
      for (var i = 0; i < cells.length; i++)
      {
          if (this.isCellDeletable(cells[i]))
          {
              var state = this.view.getState(cells[i]);
              
              if (state != null)
              {
                  var stroke = mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE);
                  var fill = mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
                  
                  if (stroke == mxConstants.NONE && fill == mxConstants.NONE)
                  {
                      cellsToRemove.push(cells[i]);
                  }
              }
          }
      }
      
      cells = cellsToRemove;
      
      mxGraph.prototype.removeCellsAfterUngroup.apply(this, arguments);
  }

  setLinkForCell(cell, link) {
      this.setAttributeForCell(cell, 'link', link);
  }

  setTooltipForCell(cell, link) {
      this.setAttributeForCell(cell, 'tooltip', link);
  }

  getAttributeForCell(cell, attributeName, defaultValue) {
      return (cell.value != null && typeof cell.value === 'object') ?
          (cell.value.getAttribute(attributeName) || defaultValue) :
          defaultValue;
  }

  setAttributeForCell(cell, attributeName, attributeValue) {
      var value = null;
      
      if (cell.value != null && typeof(cell.value) == 'object')
      {
          value = cell.value.cloneNode(true);
      }
      else
      {
          var doc = mxUtils.createXmlDocument();
          
          value = doc.createElement('UserObject');
          value.setAttribute('label', cell.value || '');
      }
      
      if (attributeValue != null)
      {
          value.setAttribute(attributeName, attributeValue);
      }
      else
      {
          value.removeAttribute(attributeName);
      }
      
      this.model.setValue(cell, value);
  }

  getDropTarget(cells, evt, cell, clone) {
      var model = this.getModel();
      
      // Disables drop into group if alt is pressed
      if (mxEvent.isAltDown(evt))
      {
          return null;
      }
      
      // Disables dragging edge labels out of edges
      for (var i = 0; i < cells.length; i++)
      {
          if (this.model.isEdge(this.model.getParent(cells[i])))
          {
              return null;
          }
      }
      
      return mxGraph.prototype.getDropTarget.apply(this, arguments);
  }

  click(me) {
      mxGraph.prototype.click.call(this, me);
      
      // Stores state and source for checking in dblClick
      this.firstClickState = me.getState();
      this.firstClickSource = me.getSource();
  }

  dblClick(evt, cell) {
      if (this.isEnabled())
      {
          var pt = mxUtils.convertPoint(this.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
  
          // Automatically adds new child cells to edges on double click
          if (evt != null && !this.model.isVertex(cell))
          {
              var state = (this.model.isEdge(cell)) ? this.view.getState(cell) : null;
              var src = mxEvent.getSource(evt);
              
              if ((this.firstClickState == state && this.firstClickSource == src) &&
                  (state == null || (state.text == null || state.text.node == null ||
                  state.text.boundingBox == null || (!mxUtils.contains(state.text.boundingBox,
                  pt.x, pt.y) && !mxUtils.isAncestorNode(state.text.node, mxEvent.getSource(evt))))) &&
                  ((state == null && !this.isCellLocked(this.getDefaultParent())) ||
                  (state != null && !this.isCellLocked(state.cell))) &&
                  (state != null || (mxClient.IS_VML && src == this.view.getCanvas()) ||
                  (mxClient.IS_SVG && src == this.view.getCanvas().ownerSVGElement)))
              {
                  cell = this.addText(pt.x, pt.y, state);
              }
          }
      
          mxGraph.prototype.dblClick.call(this, evt, cell);
      }
  }

  getInsertPoint() {
      var gs = this.getGridSize();
      var dx = this.container.scrollLeft / this.view.scale - this.view.translate.x;
      var dy = this.container.scrollTop / this.view.scale - this.view.translate.y;
      
      if (this.pageVisible)
      {
          var layout = this.getPageLayout();
          var page = this.getPageSize();
          dx = Math.max(dx, layout.x * page.width);
          dy = Math.max(dy, layout.y * page.height);
      }
      
      return new mxPoint(this.snap(dx + gs), this.snap(dy + gs));
  }

  getFreeInsertPoint() {
      var view = this.view;
      var bds = this.getGraphBounds();
      var pt = this.getInsertPoint();
      
      // Places at same x-coord and 2 grid sizes below existing graph
      var x = this.snap(Math.round(Math.max(pt.x, bds.x / view.scale - view.translate.x +
          ((bds.width == 0) ? 2 * this.gridSize : 0))));
      var y = this.snap(Math.round(Math.max(pt.y, (bds.y + bds.height) / view.scale - view.translate.y +
          2 * this.gridSize)));
      
      return new mxPoint(x, y);
  }

  isMouseInsertPoint() {			
      return false;
  }

  addText(x, y, state) {
      // Creates a new edge label with a predefined text
      var label = new mxCell();
      label.value = 'Text';
      label.style = 'text;html=1;resizable=0;points=[];'
      label.geometry = new mxGeometry(0, 0, 0, 0);
      label.vertex = true;
      
      if (state != null)
      {
          label.style += 'align=center;verticalAlign=middle;labelBackgroundColor=#ffffff;'
          label.geometry.relative = true;
          label.connectable = false;
          
          // Resets the relative location stored inside the geometry
          var pt2 = this.view.getRelativePoint(state, x, y);
          label.geometry.x = Math.round(pt2.x * 10000) / 10000;
          label.geometry.y = Math.round(pt2.y);
          
          // Resets the offset inside the geometry to find the offset from the resulting point
          label.geometry.offset = new mxPoint(0, 0);
          pt2 = this.view.getPoint(state, label.geometry);
      
          var scale = this.view.scale;
          label.geometry.offset = new mxPoint(Math.round((x - pt2.x) / scale), Math.round((y - pt2.y) / scale));
      }
      else
      {
          label.style += 'autosize=1;align=left;verticalAlign=top;spacingTop=-4;'
  
          var tr = this.view.translate;
          label.geometry.width = 40;
          label.geometry.height = 20;
          label.geometry.x = Math.round(x / this.view.scale) - tr.x;
          label.geometry.y = Math.round(y / this.view.scale) - tr.y;
      }
          
      this.getModel().beginUpdate();
      try
      {
          this.addCells([label], (state != null) ? state.cell : null);
          this.fireEvent(new mxEventObject('textInserted', 'cells', [label]));
          // Updates size of text after possible change of style via event
          this.autoSizeCell(label);
      }
      finally
      {
          this.getModel().endUpdate();
      }
      
      return label;
  }

  addClickHandler(highlight, beforeClick, onClick) {
      // Replaces links in labels for consistent right-clicks
      var checkLinks = () => {
          var links = this.container.getElementsByTagName('a');
          
          if (links != null)
          {
              for (var i = 0; i < links.length; i++)
              {
                  var href = this.getAbsoluteUrl(links[i].getAttribute('href'));
                  
                  if (href != null)
                  {
                      links[i].setAttribute('rel', this.linkRelation);
                      links[i].setAttribute('href', href);
                      
                      if (beforeClick != null)
                      {
                          mxEvent.addGestureListeners(links[i], null, null, beforeClick);
                      }
                  }
              }
          }
      };
      
      this.model.addListener(mxEvent.CHANGE, checkLinks);
      checkLinks();
      
      var cursor = this.container.style.cursor;
      var tol = this.getTolerance();
      var graph = this;

      var mouseListener =
      {
          currentState: null,
          currentLink: null,
          highlight: (highlight != null && highlight != '' && highlight != mxConstants.NONE) ?
              new mxCellHighlight(graph, highlight, 4) : null,
          startX: 0,
          startY: 0,
          scrollLeft: 0,
          scrollTop: 0,
          updateCurrentState: function(me)
          {
              var tmp = me.sourceState;
              
              // Gets topmost intersecting cell with link
              if (tmp == null || graph.getLinkForCell(tmp.cell) == null)
              {
                  var cell = graph.getCellAt(me.getGraphX(), me.getGraphY(), null, null, null, function(state, x, y)
                  {
                      return graph.getLinkForCell(state.cell) == null;
                  });
                  
                  tmp = graph.view.getState(cell);
              }
              
              if (tmp != this.currentState)
              {
                  if (this.currentState != null)
                  {
                      this.clear();
                  }
                  
                  this.currentState = tmp;
                  
                  if (this.currentState != null)
                  {
                      this.activate(this.currentState);
                  }
              }
          },
          mouseDown: function(sender, me)
          {
              this.startX = me.getGraphX();
              this.startY = me.getGraphY();
              this.scrollLeft = graph.container.scrollLeft;
              this.scrollTop = graph.container.scrollTop;
              
              if (this.currentLink == null && graph.container.style.overflow == 'auto')
              {
                  graph.container.style.cursor = 'move';
              }
              
              this.updateCurrentState(me);
          },
          mouseMove: function(sender, me)
          {
              if (graph.isMouseDown)
              {
                  if (this.currentLink != null)
                  {
                      var dx = Math.abs(this.startX - me.getGraphX());
                      var dy = Math.abs(this.startY - me.getGraphY());
                      
                      if (dx > tol || dy > tol)
                      {
                          this.clear();
                      }
                  }
              }
              else
              {
                  // Checks for parent link
                  var linkNode = me.getSource();
                  
                  while (linkNode != null && linkNode.nodeName.toLowerCase() != 'a')
                  {
                      linkNode = linkNode.parentNode;
                  }
                  
                  if (linkNode != null)
                  {
                      this.clear();
                  }
                  else
                  {
                      if (graph.tooltipHandler != null && this.currentLink != null && this.currentState != null)
                      {
                          graph.tooltipHandler.reset(me, true, this.currentState);
                      }
                      
                      if (this.currentState != null && (me.getState() == this.currentState || me.sourceState == null) &&
                          graph.intersects(this.currentState, me.getGraphX(), me.getGraphY()))
                      {
                          return;
                      }
                      
                      this.updateCurrentState(me);
                  }
              }
          },
          mouseUp: function(sender, me)
          {
              var source = me.getSource();
              var evt = me.getEvent();
              
              // Checks for parent link
              var linkNode = source;
              
              while (linkNode != null && linkNode.nodeName.toLowerCase() != 'a')
              {
                  linkNode = linkNode.parentNode;
              }
              
              // Ignores clicks on links and collapse/expand icon
              if (linkNode == null &&
                  (((Math.abs(this.scrollLeft - graph.container.scrollLeft) < tol &&
                  Math.abs(this.scrollTop - graph.container.scrollTop) < tol) &&
                  (me.sourceState == null || !me.isSource(me.sourceState.control))) &&
                  (((mxEvent.isLeftMouseButton(evt) || mxEvent.isMiddleMouseButton(evt)) &&
                  !mxEvent.isPopupTrigger(evt)) || mxEvent.isTouchEvent(evt))))
              {
                  if (this.currentLink != null)
                  {
                      var blank = graph.isBlankLink(this.currentLink);
                      
                      if ((this.currentLink.substring(0, 5) === 'data:' ||
                          !blank) && beforeClick != null)
                      {
                          beforeClick(evt, this.currentLink);
                      }
                      
                      if (!mxEvent.isConsumed(evt))
                      {
                          var target = (mxEvent.isMiddleMouseButton(evt)) ? '_blank' :
                              ((blank) ? graph.linkTarget : '_top');
                          graph.openLink(this.currentLink, target);
                          me.consume();
                      }
                  }
                  else if (onClick != null && !me.isConsumed() &&
                      (Math.abs(this.scrollLeft - graph.container.scrollLeft) < tol &&
                      Math.abs(this.scrollTop - graph.container.scrollTop) < tol) &&
                      (Math.abs(this.startX - me.getGraphX()) < tol &&
                      Math.abs(this.startY - me.getGraphY()) < tol))
                  {
                      onClick(me.getEvent());
                  }
              }
              
              this.clear();
          },
          activate: function(state)
          {
              this.currentLink = graph.getAbsoluteUrl(graph.getLinkForCell(state.cell));

              if (this.currentLink != null)
              {
                  graph.container.style.cursor = 'pointer';

                  if (this.highlight != null)
                  {
                      this.highlight.highlight(state);
                  }
              }
          },
          clear: function()
          {
              if (graph.container != null)
              {
                  graph.container.style.cursor = cursor;
              }
              
              this.currentState = null;
              this.currentLink = null;
              
              if (this.highlight != null)
              {
                  this.highlight.hide();
              }
              
              if (graph.tooltipHandler != null)
              {
                  graph.tooltipHandler.hide();
              }
          }
      };

      // Ignores built-in click handling
      graph.click = function(me) {};
      graph.addMouseListener(mouseListener);
      
      mxEvent.addListener(document, 'mouseleave', function(evt)
      {
          mouseListener.clear();
      });
  }

  duplicateCells(cells, append) {
      cells = (cells != null) ? cells : this.getSelectionCells();
      append = (append != null) ? append : true;
      
      cells = this.model.getTopmostCells(cells);
      
      var model = this.getModel();
      var s = this.gridSize;
      var select = [];
      
      model.beginUpdate();
      try
      {
          var clones = this.cloneCells(cells, false, null, true);
          
          for (var i = 0; i < cells.length; i++)
          {
              var parent = model.getParent(cells[i]);
              var child = this.moveCells([clones[i]], s, s, false)[0];
              select.push(child);
              
              if (append)
              {
                  model.add(parent, clones[i]);
              }
              else
              {
                  // Maintains child index by inserting after clone in parent
                  var index = parent.getIndex(cells[i]);
                  model.add(parent, clones[i], index + 1);
              }
          }
      }
      finally
      {
          model.endUpdate();
      }
      
      return select;
  }

  insertImage(newValue, w, h) {
      // To find the new image, we create a list of all existing links first
      if (newValue != null && this.cellEditor.textarea != null)
      {
          var tmp = this.cellEditor.textarea.getElementsByTagName('img');
          var oldImages = [];
          
          for (var i = 0; i < tmp.length; i++)
          {
              oldImages.push(tmp[i]);
          }
          
          // LATER: Fix inserting link/image in IE8/quirks after focus lost
          document.execCommand('insertimage', false, newValue);
          
          // Sets size of new image
          var newImages = this.cellEditor.textarea.getElementsByTagName('img');
          
          if (newImages.length == oldImages.length + 1)
          {
              // Inverse order in favor of appended images
              for (var i = newImages.length - 1; i >= 0; i--)
              {
                  if (i == 0 || newImages[i] != oldImages[i - 1])
                  {
                      // Workaround for lost styles during undo and redo is using attributes
                      newImages[i].setAttribute('width', w);
                      newImages[i].setAttribute('height', h);
                      
                      break;
                  }
              }
          }
      }
  }

  insertLink(value) {
      if (this.cellEditor.textarea != null)
      {
          if (value.length == 0)
          {
              document.execCommand('unlink', false);
          }
          else if (mxClient.IS_FF)
          {
              // Workaround for Firefox that adds a new link and removes
              // the href from the inner link if its parent is a span is
              // to remove all inner links inside the new outer link
              var tmp = this.cellEditor.textarea.getElementsByTagName('a');
              var oldLinks = [];
              
              for (var i = 0; i < tmp.length; i++)
              {
                  oldLinks.push(tmp[i]);
              }
              
              document.execCommand('createlink', false, mxUtils.trim(value));
              
              // Finds the new link element
              var newLinks = this.cellEditor.textarea.getElementsByTagName('a');
              
              if (newLinks.length == oldLinks.length + 1)
              {
                  // Inverse order in favor of appended links
                  for (var i = newLinks.length - 1; i >= 0; i--)
                  {
                      if (newLinks[i] != oldLinks[i - 1])
                      {
                          // Removes all inner links from the new link and
                          // moves the children to the inner link parent
                          var tmp = newLinks[i].getElementsByTagName('a');
                          
                          while (tmp.length > 0)
                          {
                              var parent = tmp[0].parentNode;
                              
                              while (tmp[0].firstChild != null)
                              {
                                  parent.insertBefore(tmp[0].firstChild, tmp[0]);
                              }
                              
                              parent.removeChild(tmp[0]);
                          }
                          
                          break;
                      }
                  }
              }
          }
          else
          {
              // LATER: Fix inserting link/image in IE8/quirks after focus lost
              document.execCommand('createlink', false, mxUtils.trim(value));
          }
      }
  }

  isCellResizable(cell) {
      var result = mxGraph.prototype.isCellResizable.apply(this, arguments);
  
      var state = this.view.getState(cell);
      var style = (state != null) ? state.style : this.getCellStyle(cell);
          
      return result || (mxUtils.getValue(style, mxConstants.STYLE_RESIZABLE, '1') != '0' &&
          style[mxConstants.STYLE_WHITE_SPACE] == 'wrap');
  }

  distributeCells(horizontal, cells) {
      if (cells == null)
      {
          cells = this.getSelectionCells();
      }
      
      if (cells != null && cells.length > 1)
      {
          var vertices = [];
          var max = null;
          var min = null;
          
          for (var i = 0; i < cells.length; i++)
          {
              if (this.getModel().isVertex(cells[i]))
              {
                  var state = this.view.getState(cells[i]);
                  
                  if (state != null)
                  {
                      var tmp = (horizontal) ? state.getCenterX() : state.getCenterY();
                      max = (max != null) ? Math.max(max, tmp) : tmp;
                      min = (min != null) ? Math.min(min, tmp) : tmp;
                      
                      vertices.push(state);
                  }
              }
          }
          
          if (vertices.length > 2)
          {
              vertices.sort(function(a, b)
              {
                  return (horizontal) ? a.x - b.x : a.y - b.y;
              });
  
              var t = this.view.translate;
              var s = this.view.scale;
              
              min = min / s - ((horizontal) ? t.x : t.y);
              max = max / s - ((horizontal) ? t.x : t.y);
              
              this.getModel().beginUpdate();
              try
              {
                  var dt = (max - min) / (vertices.length - 1);
                  var t0 = min;
                  
                  for (var i = 1; i < vertices.length - 1; i++)
                  {
                      var pstate = this.view.getState(this.model.getParent(vertices[i].cell));
                      var geo = this.getCellGeometry(vertices[i].cell);
                      t0 += dt;
                      
                      if (geo != null && pstate != null)
                      {
                          geo = geo.clone();
                          
                          if (horizontal)
                          {
                              geo.x = Math.round(t0 - geo.width / 2) - pstate.origin.x;
                          }
                          else
                          {
                              geo.y = Math.round(t0 - geo.height / 2) - pstate.origin.y;
                          }
                          
                          this.getModel().setGeometry(vertices[i].cell, geo);
                      }
                  }
              }
              finally
              {
                  this.getModel().endUpdate();
              }
          }
      }
      
      return cells;
  }

  isCloneEvent(evt) {
      return (mxClient.IS_MAC && mxEvent.isMetaDown(evt)) || mxEvent.isControlDown(evt);
  }

  encodeCells(cells) {
      var clones = this.cloneCells(cells);
      
      // Creates a dictionary for fast lookups
      var dict = new mxDictionary();
      
      for (var i = 0; i < cells.length; i++)
      {
          dict.put(cells[i], true);
      }
      
      // Checks for orphaned relative children and makes absolute
      for (var i = 0; i < clones.length; i++)
      {
          var state = this.view.getState(cells[i]);
          
          if (state != null)
          {
              var geo = this.getCellGeometry(clones[i]);
              
              if (geo != null && geo.relative && !this.model.isEdge(cells[i]) &&
                  !dict.get(this.model.getParent(cells[i])))
              {
                  geo.relative = false;
                  geo.x = state.x / state.view.scale - state.view.translate.x;
                  geo.y = state.y / state.view.scale - state.view.translate.y;
              }
          }
      }
      
      var codec = new mxCodec();
      var model = new mxGraphModel();
      var parent = model.getChildAt(model.getRoot(), 0);
      
      for (var i = 0; i < cells.length; i++)
      {
          model.add(parent, clones[i]);
      }

      return codec.encode(model);
  }

  createSvgImageExport() {
      var exp = new mxImageExport();
      
      // Adds hyperlinks (experimental)
      exp.getLinkForCellState = (state, canvas) => {
          return this.getLinkForCell(state.cell);
      };

      return exp;
  }

  getSvg(
    background,
    scale,
    border,
    nocrop,
    crisp,
    ignoreSelection,
    showText,
    imgExport,
    linkTarget,
    hasShadow
  ) {
      //Disable Css Transforms if it is used
      var origUseCssTrans = this.useCssTransforms;
      
      if (origUseCssTrans) 
      {
          this.useCssTransforms = false;
          this.view.revalidate();
          this.sizeDidChange();
      }

      try 
      {
          scale = (scale != null) ? scale : 1;
          border = (border != null) ? border : 0;
          crisp = (crisp != null) ? crisp : true;
          ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
          showText = (showText != null) ? showText : true;

          var bounds = (ignoreSelection || nocrop) ?
                  this.getGraphBounds() : this.getBoundingBox(this.getSelectionCells());

          if (bounds == null)
          {
              throw Error(mxResources.get('drawingEmpty'));
          }

          var vs = this.view.scale;
          
          // Prepares SVG document that holds the output
          var svgDoc = mxUtils.createXmlDocument();
          var root = (svgDoc.createElementNS != null) ?
              svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
          
          if (background != null)
          {
              if (root.style != null)
              {
                  root.style.backgroundColor = background;
              }
              else
              {
                  root.setAttribute('style', 'background-color:' + background);
              }
          }
          
          if (svgDoc.createElementNS == null)
          {
              root.setAttribute('xmlns', mxConstants.NS_SVG);
              root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
          }
          else
          {
              // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
              root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
          }
          
          var s = scale / vs;
          var w = Math.max(1, Math.ceil(bounds.width * s) + 2 * border) + ((hasShadow) ? 5 : 0);
          var h = Math.max(1, Math.ceil(bounds.height * s) + 2 * border) + ((hasShadow) ? 5 : 0);
          
          root.setAttribute('version', '1.1');
          root.setAttribute('width', w + 'px');
          root.setAttribute('height', h + 'px');
          root.setAttribute('viewBox', ((crisp) ? '-0.5 -0.5' : '0 0') + ' ' + w + ' ' + h);
          svgDoc.appendChild(root);
      
          // Renders graph. Offset will be multiplied with state's scale when painting state.
          // TextOffset only seems to affect FF output but used everywhere for consistency.
          var group = (svgDoc.createElementNS != null) ?
              svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
          root.appendChild(group);

          var svgCanvas = this.createSvgCanvas(group);
          svgCanvas.foOffset = (crisp) ? -0.5 : 0;
          svgCanvas.textOffset = (crisp) ? -0.5 : 0;
          svgCanvas.imageOffset = (crisp) ? -0.5 : 0;
          svgCanvas.translate(Math.floor((border / scale - bounds.x) / vs),
              Math.floor((border / scale - bounds.y) / vs));
          
          // Convert HTML entities
          var htmlConverter = document.createElement('textarea');
          
          // Adds simple text fallback for viewers with no support for foreignObjects
          var createAlternateContent = svgCanvas.createAlternateContent;
          svgCanvas.createAlternateContent = function(fo, x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation)
          {
              var s = this.state;

              // Assumes a max character width of 0.2em
              if (this.foAltText != null && (w == 0 || (s.fontSize != 0 && str.length < (w * 5) / s.fontSize)))
              {
                  var alt = this.createElement('text');
                  alt.setAttribute('x', Math.round(w / 2));
                  alt.setAttribute('y', Math.round((h + s.fontSize) / 2));
                  alt.setAttribute('fill', s.fontColor || 'black');
                  alt.setAttribute('text-anchor', 'middle');
                  alt.setAttribute('font-size', Math.round(s.fontSize) + 'px');
                  alt.setAttribute('font-family', s.fontFamily);
                  
                  if ((s.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD)
                  {
                      alt.setAttribute('font-weight', 'bold');
                  }
                  
                  if ((s.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC)
                  {
                      alt.setAttribute('font-style', 'italic');
                  }
                  
                  if ((s.fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE)
                  {
                      alt.setAttribute('text-decoration', 'underline');
                  }
                  
                  try
                  {
                      htmlConverter.innerHTML = str;
                      alt.textContent = htmlConverter.value;
                      
                      return alt;
                  }
                  catch (e)
                  {
                      return createAlternateContent.apply(this, arguments);
                  }
              }
              else
              {
                  return createAlternateContent.apply(this, arguments);
              }
          };
          
          // Paints background image
          var bgImg = this.backgroundImage;
          
          if (bgImg != null)
          {
              var s2 = vs / scale;
              var tr = this.view.translate;
              var tmp = new mxRectangle(tr.x * s2, tr.y * s2, bgImg.width * s2, bgImg.height * s2);
              
              // Checks if visible
              if (mxUtils.intersects(bounds, tmp))
              {
                  svgCanvas.image(tr.x, tr.y, bgImg.width, bgImg.height, bgImg.src, true);
              }
          }
          
          svgCanvas.scale(s);
          svgCanvas.textEnabled = showText;
          
          imgExport = (imgExport != null) ? imgExport : this.createSvgImageExport();
          var imgExportDrawCellState = imgExport.drawCellState;
          
          // Implements ignoreSelection flag
          imgExport.drawCellState = function(state, canvas)
          {
              var graph = state.view.graph;
              var selected = graph.isCellSelected(state.cell);
              var parent = graph.model.getParent(state.cell);
              
              // Checks if parent cell is selected
              while (!ignoreSelection && !selected && parent != null)
              {
                  selected = graph.isCellSelected(parent);
                  parent = graph.model.getParent(parent);
              }
              
              if (ignoreSelection || selected)
              {
                  imgExportDrawCellState.apply(this, arguments);
              }
          };

          imgExport.drawState(this.getView().getState(this.model.root), svgCanvas);
          this.updateSvgLinks(root, linkTarget, true);
      
          return root;
      }
      finally
      {
          if (origUseCssTrans) 
          {
              this.useCssTransforms = true;
              this.view.revalidate();
              this.sizeDidChange();
          }
      }
  }

  updateSvgLinks(node, target, removeCustom) {
      var links = node.getElementsByTagName('a');
      
      for (var i = 0; i < links.length; i++)
      {
          var href = links[i].getAttribute('href');
          
          if (href == null)
          {
              href = links[i].getAttribute('xlink:href');
          }
          
          if (href != null)
          {
              if (target != null && /^https?:\/\//.test(href))
              {
                  links[i].setAttribute('target', target);
              }
              else if (removeCustom && this.isCustomLink(href))
              {
                  links[i].setAttribute('href', 'javascript:void(0);');
              }
          }
      }
  }

  createSvgCanvas(node) {
      return new mxSvgCanvas2D(node);
  }

  getSelectedElement() {
      var node = null;
      
      if (window.getSelection)
      {
          var sel = window.getSelection();
          
          if (sel.getRangeAt && sel.rangeCount)
          {
              var range = sel.getRangeAt(0);
              node = range.commonAncestorContainer;
          }
      }
      else if (document.selection)
      {
          node = document.selection.createRange().parentElement();
      }
      
      return node;
  }

  getParentByName(node, name, stopAt) {
      while (node != null)
      {
          if (node.nodeName == name)
          {
              return node;
          }
  
          if (node == stopAt)
          {
              return null;
          }
          
          node = node.parentNode;
      }
      
      return node;
  }

  getParentByNames(node, names, stopAt) {
      while (node != null)
      {
          if (mxUtils.indexOf(names, node.nodeName) >= 0)
          {
              return node;
          }
  
          if (node == stopAt)
          {
              return null;
          }
          
          node = node.parentNode;
      }
      
      return node;
  }

  selectNode(node) {
      var sel = null;
      
      // IE9 and non-IE
      if (window.getSelection)
      {
          sel = window.getSelection();
          
          if (sel.getRangeAt && sel.rangeCount)
          {
              var range = document.createRange();
              range.selectNode(node);
              sel.removeAllRanges();
              sel.addRange(range);
          }
      }
      // IE < 9
      else if ((sel = document.selection) && sel.type != 'Control')
      {
          var originalRange = sel.createRange();
          originalRange.collapse(true);
          var range = sel.createRange();
          range.setEndPoint('StartToStart', originalRange);
          range.select();
      }
  }

  insertRow(table, index) {
      var bd = table.tBodies[0];
      var cells = bd.rows[0].cells;
      var cols = 0;
      
      // Counts columns including colspans
      for (var i = 0; i < cells.length; i++)
      {
          var colspan = cells[i].getAttribute('colspan');
          cols += (colspan != null) ? parseInt(colspan) : 1;
      }
      
      var row = bd.insertRow(index);
      
      for (var i = 0; i < cols; i++)
      {
          mxUtils.br(row.insertCell(-1));
      }
      
      return row.cells[0];
  }

  deleteRow(table, index) {
      table.tBodies[0].deleteRow(index);
  }

  insertColumn(table, index) {
      var hd = table.tHead;
      
      if (hd != null)
      {
          // TODO: use colIndex
          for (var h = 0; h < hd.rows.length; h++)
          {
              var th = document.createElement('th');
              hd.rows[h].appendChild(th);
              mxUtils.br(th);
          }
      }
  
      var bd = table.tBodies[0];
      
      for (var i = 0; i < bd.rows.length; i++)
      {
          var cell = bd.rows[i].insertCell(index);
          mxUtils.br(cell);
      }
      
      return bd.rows[0].cells[(index >= 0) ? index : bd.rows[0].cells.length - 1];
  }

  deleteColumn(table, index) {
      if (index >= 0)
      {
          var bd = table.tBodies[0];
          var rows = bd.rows;
          
          for (var i = 0; i < rows.length; i++)
          {
              if (rows[i].cells.length > index)
              {
                  rows[i].deleteCell(index);
              }
          }
      }
  }

  pasteHtmlAtCaret(html) {
      var sel, range;
  
      // IE9 and non-IE
      if (window.getSelection)
      {
          sel = window.getSelection();
          
          if (sel.getRangeAt && sel.rangeCount)
          {
              range = sel.getRangeAt(0);
              range.deleteContents();
  
              // Range.createContextualFragment() would be useful here but is
              // only relatively recently standardized and is not supported in
              // some browsers (IE9, for one)
              var el = document.createElement("div");
              el.innerHTML = html;
              var frag = document.createDocumentFragment(), node;
              
              while ((node = el.firstChild))
              {
                  lastNode = frag.appendChild(node);
              }
              
              range.insertNode(frag);
          }
      }
      // IE < 9
      else if ((sel = document.selection) && sel.type != "Control")
      {
          // FIXME: Does not work if selection is empty
          sel.createRange().pasteHTML(html);
      }
  }

  createLinkForHint(link, label) {
      link = (link != null) ? link : 'javascript:void(0);';

      if (label == null || label.length == 0)
      {
          if (this.isCustomLink(link))
          {
              label = this.getLinkTitle(link);
          }
          else
          {
              label = link;
          }
      }

      // Helper function to shorten strings
      function short(str, max)
      {
          if (str.length > max)
          {
              str = str.substring(0, Math.round(max / 2)) + '...' +
                  str.substring(str.length - Math.round(max / 4));
          }
          
          return str;
      };
      
      var a = document.createElement('a');
      a.setAttribute('rel', this.linkRelation);
      a.setAttribute('href', this.getAbsoluteUrl(link));
      a.setAttribute('title', short((this.isCustomLink(link)) ?
          this.getLinkTitle(link) : link, 80));
      
      if (this.linkTarget != null)
      {
          a.setAttribute('target', this.linkTarget);
      }
      
      // Adds shortened label to link
      mxUtils.write(a, short(label, 40));
      
      // Handles custom links
      if (this.isCustomLink(link))
      {
          mxEvent.addListener(a, 'click', evt => {
              this.customLinkClicked(link);
              mxEvent.consume(evt);
          });
      }
      
      return a;
  }

  initTouch() {
      // Disables new connections via "hotspot"
      this.connectionHandler.marker.isEnabled = function()
      {
          return this.graph.connectionHandler.first != null;
      };
  
      // Hides menu when editing starts
      this.addListener(mxEvent.START_EDITING, function(sender, evt)
      {
          this.popupMenuHandler.hideMenu();
      });
  
      // Adds custom hit detection if native hit detection found no cell
      var graphUpdateMouseEvent = this.updateMouseEvent;
      this.updateMouseEvent = function(me)
      {
          me = graphUpdateMouseEvent.apply(this, arguments);

          if (mxEvent.isTouchEvent(me.getEvent()) && me.getState() == null)
          {
              var cell = this.getCellAt(me.graphX, me.graphY);
  
              if (cell != null && this.isSwimlane(cell) && this.hitsSwimlaneContent(cell, me.graphX, me.graphY))
              {
                  cell = null;
              }
              else
              {
                  me.state = this.view.getState(cell);
                  
                  if (me.state != null && me.state.shape != null)
                  {
                      this.container.style.cursor = me.state.shape.node.style.cursor;
                  }
              }
          }
          
          if (me.getState() == null && this.isEnabled())
          {
              this.container.style.cursor = 'default';
          }
          
          return me;
      };
  
      // Context menu trigger implementation depending on current selection state
      // combined with support for normal popup trigger.
      var cellSelected = false;
      var selectionEmpty = false;
      var menuShowing = false;
      
      var oldFireMouseEvent = this.fireMouseEvent;
      
      this.fireMouseEvent = function(evtName, me, sender)
      {
          if (evtName == mxEvent.MOUSE_DOWN)
          {
              // For hit detection on edges
              me = this.updateMouseEvent(me);
              
              cellSelected = this.isCellSelected(me.getCell());
              selectionEmpty = this.isSelectionEmpty();
              menuShowing = this.popupMenuHandler.isMenuShowing();
          }
          
          oldFireMouseEvent.apply(this, arguments);
      };
      
      // Shows popup menu if cell was selected or selection was empty and background was clicked
      // FIXME: Conflicts with mxPopupMenuHandler.prototype.getCellForPopupEvent in Editor.js by
      // selecting parent for selected children in groups before this check can be made.
      this.popupMenuHandler.mouseUp = mxUtils.bind(this, function(sender, me)
      {
          this.popupMenuHandler.popupTrigger = !this.isEditing() && this.isEnabled() &&
              (me.getState() == null || !me.isSource(me.getState().control)) &&
              (this.popupMenuHandler.popupTrigger || (!menuShowing && !mxEvent.isMouseEvent(me.getEvent()) &&
              ((selectionEmpty && me.getCell() == null && this.isSelectionEmpty()) ||
              (cellSelected && this.isCellSelected(me.getCell())))));
          mxPopupMenuHandler.prototype.mouseUp.apply(this.popupMenuHandler, arguments);
      });
  }

  tolerance = 12;
}

export default Graph
