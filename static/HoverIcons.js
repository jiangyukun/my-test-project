import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class HoverIcons {
  arrowSpacing = 2;
  updateDelay = 500;
  activationDelay = 140;
  currentState = null;
  activeArrow = null;
  inactiveOpacity = 15;
  cssCursor = 'copy';
  checkCollisions = true;
  arrowFill = '#29b6f2';

  triangleUp = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/triangle-up.png', 26, 14) :
      Graph.createSvgImage(18, 28, '<path d="m 6 26 L 12 26 L 12 12 L 18 12 L 9 1 L 1 12 L 6 12 z" ' +
      'stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');

  triangleRight = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/triangle-right.png', 14, 26) :
      Graph.createSvgImage(26, 18, '<path d="m 1 6 L 14 6 L 14 1 L 26 9 L 14 18 L 14 12 L 1 12 z" ' +
      'stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');

  triangleDown = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/triangle-down.png', 26, 14) :
      Graph.createSvgImage(18, 26, '<path d="m 6 1 L 6 14 L 1 14 L 9 26 L 18 14 L 12 14 L 12 1 z" ' +
      'stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');

  triangleLeft = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/triangle-left.png', 14, 26) :
      Graph.createSvgImage(28, 18, '<path d="m 1 9 L 12 1 L 12 6 L 26 6 L 26 12 L 12 12 L 12 18 z" ' +
      'stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');

  roundDrop = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/round-drop.png', 26, 26) :
      Graph.createSvgImage(26, 26, '<circle cx="13" cy="13" r="12" ' +
      'stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>');

  refreshTarget = new mxImage((mxClient.IS_SVG) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQxNERDRTU1QjY1MTFFNDkzNTRFQTVEMTdGMTdBQjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQxNERDRTY1QjY1MTFFNDkzNTRFQTVEMTdGMTdBQjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NDE0RENFMzVCNjUxMUU0OTM1NEVBNUQxN0YxN0FCNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NDE0RENFNDVCNjUxMUU0OTM1NEVBNUQxN0YxN0FCNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvuX50AAANaSURBVHja7FjRZ1tRGD9ZJ1NCyIQSwrivI4Q8hCpjlFDyFEoYfSp9Ko1QWnmo0If+BSXkIfo0QirTMUpeGo2EPfWllFYjZMLKLDJn53d3biU337m5J223bPbxk5t7v+/c3/2+73znO8fDOWezKM/YjMpz68Lj8ejY+QTeCCwLxOS9qPxtyN+6wAeBTwJ31CCO0cJDjXBGBN4LfIepSwykTUT1bgpuib0SONIgo8KRHOtRiCFcvUcgZeGrHPNBxLIyFPyRgTGz0xLbegJCdmzpElue5KlAIMDX19d5uVzm5+fnfDAYmMA17uEZdOx2Yvb/sHlu2S0xwymn5ufneTab5b1ej08S6EAXNrDd2dnhiUTim21MvMtwQ6yiIrWwsMDPzs64rsBmf3/fvM7n89TYlUnEllSkQqEQv7q64g+Vk5MTVXosORErU0Zer5f0FEIlw2N6MxwO82QyaXql2+2SxDqdjopYWUUsqEp45IldqtWq6UWVh/1+P7+8vCTJ4QMUJSRIEXuneoH96w8PDyeWAnhSJfCqwm6NIlaklFdXV0cGhRcQ2mlJQXK5nMq2YPEZbnteU1U2lUqN/D84OGD9fl+5fgnSrFarsUwmw0qlEru4uBjTicViTk3Cr27HSnxR+Doyz0ZE1CAWiUTusbu7y9rttlZv5fP5WDQavYfIMba4uEipfhF8XtqJoZXx/uH+sC/4vPg7OljZZQbsCmLtYzc3N6zRaJhotVrmfx0xDINtbm6athYUeXpHdbBNaqZUKpWxWXV7e2vex+xaWVnhc3NzjrPUXgexyCt0m67LBV7uJMITjqRE4o8tZeg8FPpFitgapYxiOC0poFgsji1jKNo6BZZckrAGUtJsNk1vqAihCBcKhTE7hNWhqw2qFnGy5UFOUYJVIJ1OjzSE+BCEilon0URavRmBqnbbQ00AXbm+vnZc9O1tj72OnQoc2+cwygRkb2+P1et17ZoEm3g87lRmjgWZ00kbXkNuse6/Bu2wlegIxfb2tuvWGroO4bO2c4bbzUh60mxDXm1sbJhhxkQYnhS4h2fUZoRAWnf7lv8N27f8P7Xhnekjgpk+VKGOoQbsiY+hhhtF3YO7twIJ+ULvUGv+GQ2fQEvWxI/THNx5/p/BaspPAQYAqStgiSQwCDoAAAAASUVORK5CYII=' :
      IMAGE_PATH + '/refresh.png', 38, 38);

  tolerance = (mxClient.IS_TOUCH) ? 6 : 0;

  init() {
      this.arrowUp = this.createArrow(this.triangleUp, mxResources.get('plusTooltip'));
      this.arrowRight = this.createArrow(this.triangleRight, mxResources.get('plusTooltip'));
      this.arrowDown = this.createArrow(this.triangleDown, mxResources.get('plusTooltip'));
      this.arrowLeft = this.createArrow(this.triangleLeft, mxResources.get('plusTooltip'));

      this.elts = [this.arrowUp, this.arrowRight, this.arrowDown, this.arrowLeft];

      this.repaintHandler = () => {
          this.repaint();
      };

      this.graph.selectionModel.addListener(mxEvent.CHANGE, this.repaintHandler);
      this.graph.model.addListener(mxEvent.CHANGE, this.repaintHandler);
      this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.repaintHandler);
      this.graph.view.addListener(mxEvent.TRANSLATE, this.repaintHandler);
      this.graph.view.addListener(mxEvent.SCALE, this.repaintHandler);
      this.graph.view.addListener(mxEvent.DOWN, this.repaintHandler);
      this.graph.view.addListener(mxEvent.UP, this.repaintHandler);
      this.graph.addListener(mxEvent.ROOT, this.repaintHandler);
      
      // Resets the mouse point on escape
      this.graph.addListener(mxEvent.ESCAPE, () => {
          this.mouseDownPoint = null;
      });

      // Removes hover icons if mouse leaves the container
      mxEvent.addListener(this.graph.container, 'mouseleave',  () => {
          // Workaround for IE11 firing mouseleave for touch in diagram
          if (evt.relatedTarget != null && mxEvent.getSource(evt) == this.graph.container)
          {
              this.setDisplay('none');
          }
      });
      
      // Resets current state when in-place editor starts
      this.graph.addListener(mxEvent.START_EDITING, () => {
          this.reset();
      });
      
      // Resets current state after update of selection state for touch events
      var graphClick = this.graph.click;
      this.graph.click = () => {
          graphClick.apply(this.graph, arguments);
          
          if (this.currentState != null && !this.graph.isCellSelected(this.currentState.cell) &&
              mxEvent.isTouchEvent(me.getEvent()) && !this.graph.model.isVertex(me.getCell()))
          {
              this.reset();
          }
      };
      
      // Checks if connection handler was active in mouse move
      // as workaround for possible double connection inserted
      var connectionHandlerActive = false;
      
      // Implements a listener for hover and click handling
      this.graph.addMouseListener(
      {
          mouseDown: () => {
              connectionHandlerActive = false;
              var evt = me.getEvent();
              
              if (this.isResetEvent(evt))
              {
                  this.reset();
              }
              else if (!this.isActive())
              {
                  var state = this.getState(me.getState());
                  
                  if (state != null || !mxEvent.isTouchEvent(evt))
                  {
                      this.update(state);
                  }
              }
              
              this.setDisplay('none');
          },
          mouseMove: () => {
              var evt = me.getEvent();
              
              if (this.isResetEvent(evt))
              {
                  this.reset();
              }
              else if (!this.graph.isMouseDown && !mxEvent.isTouchEvent(evt))
              {
                  this.update(this.getState(me.getState()),
                      me.getGraphX(), me.getGraphY());
              }
              
              if (this.graph.connectionHandler != null &&
                  this.graph.connectionHandler.shape != null)
              {
                  connectionHandlerActive = true;
              }
          },
          mouseUp: () => {
              var evt = me.getEvent();
              var pt = mxUtils.convertPoint(this.graph.container,
                  mxEvent.getClientX(evt), mxEvent.getClientY(evt))
              
              if (this.isResetEvent(evt))
              {
                  this.reset();
              }
              else if (this.isActive() && !connectionHandlerActive &&
                  this.mouseDownPoint != null)
              {
                  this.click(this.currentState, this.getDirection(), me);
              }
              else if (this.isActive())
              {
                  // Selects target vertex after drag and clone if not only new edge was inserted
                  if (this.graph.getSelectionCount() != 1 || !this.graph.model.isEdge(
                      this.graph.getSelectionCell()))
                  {
                      this.update(this.getState(this.graph.view.getState(
                          this.graph.getCellAt(me.getGraphX(), me.getGraphY()))));
                  }
                  else
                  {
                      this.reset();
                  }
              }
              else if (mxEvent.isTouchEvent(evt) || (this.bbox != null &&
                  mxUtils.contains(this.bbox, me.getGraphX(), me.getGraphY())))
              {
                  // Shows existing hover icons if inside bounding box
                  this.setDisplay('');
                  this.repaint();
              }
              else if (!mxEvent.isTouchEvent(evt))
              {
                  this.reset();
              }
              
              connectionHandlerActive = false;
              this.resetActiveArrow();
          }
      });
  }

  isResetEvent(evt, allowShift) {
      return mxEvent.isAltDown(evt) || (this.activeArrow == null && mxEvent.isShiftDown(evt)) ||
          mxEvent.isMetaDown(evt) || (mxEvent.isPopupTrigger(evt) && !mxEvent.isControlDown(evt));
  }

  createArrow(img, tooltip) {
      var arrow = null;
      
      if (mxClient.IS_IE && !mxClient.IS_SVG)
      {
          // Workaround for PNG images in IE6
          if (mxClient.IS_IE6 && document.compatMode != 'CSS1Compat')
          {
              arrow = document.createElement(mxClient.VML_PREFIX + ':image');
              arrow.setAttribute('src', img.src);
              arrow.style.borderStyle = 'none';
          }
          else
          {
              arrow = document.createElement('div');
              arrow.style.backgroundImage = 'url(' + img.src + ')';
              arrow.style.backgroundPosition = 'center';
              arrow.style.backgroundRepeat = 'no-repeat';
          }
          
          arrow.style.width = (img.width + 4) + 'px';
          arrow.style.height = (img.height + 4) + 'px';
          arrow.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
      }
      else
      {
          arrow = mxUtils.createImage(img.src);
          arrow.style.width = img.width + 'px';
          arrow.style.height = img.height + 'px';
          arrow.style.padding = this.tolerance + 'px';
      }
      
      if (tooltip != null)
      {
          arrow.setAttribute('title', tooltip);
      }
      
      arrow.style.position = 'absolute';
      arrow.style.cursor = this.cssCursor;

      mxEvent.addGestureListeners(arrow, () => {
          if (this.currentState != null && !this.isResetEvent(evt))
          {
              this.mouseDownPoint = mxUtils.convertPoint(this.graph.container,
                      mxEvent.getClientX(evt), mxEvent.getClientY(evt));
              this.drag(evt, this.mouseDownPoint.x, this.mouseDownPoint.y);
              this.activeArrow = arrow;
              this.setDisplay('none');
              mxEvent.consume(evt);
          }
      });
      
      // Captures mouse events as events on graph
      mxEvent.redirectMouseEvents(arrow, this.graph, this.currentState);
      
      mxEvent.addListener(arrow, 'mouseenter', () => {
          // Workaround for Firefox firing mouseenter on touchend
          if (mxEvent.isMouseEvent(evt))
          {
              if (this.activeArrow != null && this.activeArrow != arrow)
              {
                  mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity);
              }

              this.graph.connectionHandler.constraintHandler.reset();
              mxUtils.setOpacity(arrow, 100);
              this.activeArrow = arrow;
          }
      });
      
      mxEvent.addListener(arrow, 'mouseleave', () => {
          // Workaround for IE11 firing this event on touch
          if (!this.graph.isMouseDown)
          {
              this.resetActiveArrow();
          }
      });
      
      return arrow;
  }

  resetActiveArrow() {
      if (this.activeArrow != null)
      {
          mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity);
          this.activeArrow = null;
      }
  }

  getDirection() {
      var dir = mxConstants.DIRECTION_EAST;

      if (this.activeArrow == this.arrowUp)
      {
          dir = mxConstants.DIRECTION_NORTH;
      }
      else if (this.activeArrow == this.arrowDown)
      {
          dir = mxConstants.DIRECTION_SOUTH;
      }
      else if (this.activeArrow == this.arrowLeft)
      {
          dir = mxConstants.DIRECTION_WEST;
      }
          
      return dir;
  }

  visitNodes(visitor) {
      for (var i = 0; i < this.elts.length; i++)
      {
          if (this.elts[i] != null)
          {
              visitor(this.elts[i]);
          }
      }
  }

  removeNodes() {
      this.visitNodes(function(elt)
      {
          if (elt.parentNode != null)
          {
              elt.parentNode.removeChild(elt);
          }
      });
  }

  setDisplay(display) {
      this.visitNodes(function(elt)
      {
          elt.style.display = display;
      });
  }

  isActive() {
      return this.activeArrow != null && this.currentState != null;
  }

  drag(evt, x, y) {
      this.graph.popupMenuHandler.hideMenu();
      this.graph.stopEditing(false);

      // Checks if state was removed in call to stopEditing above
      if (this.currentState != null)
      {
          this.graph.connectionHandler.start(this.currentState, x, y);
          this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
          this.graph.isMouseDown = true;
          
          // Hides handles for selection cell
          var handler = this.graph.selectionCellsHandler.getHandler(this.currentState.cell);
          
          if (handler != null)
          {
              handler.setHandlesVisible(false);
          }
          
          // Ctrl+shift drag sets source constraint
          var es = this.graph.connectionHandler.edgeState;

          if (evt != null && mxEvent.isShiftDown(evt) && mxEvent.isControlDown(evt) && es != null &&
              mxUtils.getValue(es.style, mxConstants.STYLE_EDGE, null) === 'orthogonalEdgeStyle')
          {
              var direction = this.getDirection();
              es.cell.style = mxUtils.setStyle(es.cell.style, 'sourcePortConstraint', direction);
              es.style['sourcePortConstraint'] = direction;
          }
      }
  }

  getStateAt(state, x, y) {
      return this.graph.view.getState(this.graph.getCellAt(x, y));
  }

  click(state, dir, me) {
      var evt = me.getEvent();
      var x = me.getGraphX();
      var y = me.getGraphY();
      
      var tmp = this.getStateAt(state, x, y);
      
      if (tmp != null && this.graph.model.isEdge(tmp.cell) && !mxEvent.isControlDown(evt) &&
          (tmp.getVisibleTerminalState(true) == state || tmp.getVisibleTerminalState(false) == state))
      {
          this.graph.setSelectionCell(tmp.cell);
          this.reset();
      }
      else if (state != null)
      {
          var cells = this.graph.connectVertex(state.cell, dir, this.graph.defaultEdgeLength, evt);
          this.graph.selectCellsForConnectVertex(cells, evt, this);
          
          // Selects only target vertex if one exists
          if (cells.length == 2 && this.graph.model.isVertex(cells[1]))
          {
              this.graph.setSelectionCell(cells[1]);
              
              // Adds hover icons to new target vertex for touch devices
              if (mxEvent.isTouchEvent(evt))
              {
                  this.update(this.getState(this.graph.view.getState(cells[1])));
              }
              else
              {
                  // Hides hover icons after click with mouse
                  this.reset();
              }
              
              this.graph.scrollCellToVisible(cells[1]);
          }
          else
          {
              this.graph.setSelectionCells(cells);
          }
      }
      
      me.consume();
  }

  reset(clearTimeout) {
      clearTimeout = (clearTimeout == null) ? true : clearTimeout;
      
      if (clearTimeout && this.updateThread != null)
      {
          window.clearTimeout(this.updateThread);
      }

      this.mouseDownPoint = null;
      this.currentState = null;
      this.activeArrow = null;
      this.removeNodes();
      this.bbox = null;
  }

  repaint() {
      this.bbox = null;
      
      if (this.currentState != null)
      {
          // Checks if cell was deleted
          this.currentState = this.getState(this.currentState);
          
          // Cell was deleted	
          if (this.currentState != null &&
              this.graph.model.isVertex(this.currentState.cell) &&
              this.graph.isCellConnectable(this.currentState.cell))
          {
              var bds = mxRectangle.fromRectangle(this.currentState);
              
              // Uses outer bounding box to take rotation into account
              if (this.currentState.shape != null && this.currentState.shape.boundingBox != null)
              {
                  bds = mxRectangle.fromRectangle(this.currentState.shape.boundingBox);
              }

              bds.grow(this.graph.tolerance);
              bds.grow(this.arrowSpacing);
              
              var handler = this.graph.selectionCellsHandler.getHandler(this.currentState.cell);
              
              if (handler != null)
              {
                  bds.x -= handler.horizontalOffset / 2;
                  bds.y -= handler.verticalOffset / 2;
                  bds.width += handler.horizontalOffset;
                  bds.height += handler.verticalOffset;
                  
                  // Adds bounding box of rotation handle to avoid overlap
                  if (handler.rotationShape != null && handler.rotationShape.node != null &&
                      handler.rotationShape.node.style.visibility != 'hidden' &&
                      handler.rotationShape.node.style.display != 'none' &&
                      handler.rotationShape.boundingBox != null)
                  {
                      bds.add(handler.rotationShape.boundingBox);
                  }
              }
              
              this.arrowUp.style.left = Math.round(this.currentState.getCenterX() - this.triangleUp.width / 2 - this.tolerance) + 'px';
              this.arrowUp.style.top = Math.round(bds.y - this.triangleUp.height - this.tolerance) + 'px';
              mxUtils.setOpacity(this.arrowUp, this.inactiveOpacity);
              
              this.arrowRight.style.left = Math.round(bds.x + bds.width - this.tolerance) + 'px';
              this.arrowRight.style.top = Math.round(this.currentState.getCenterY() - this.triangleRight.height / 2 - this.tolerance) + 'px';
              mxUtils.setOpacity(this.arrowRight, this.inactiveOpacity);
              
              this.arrowDown.style.left = this.arrowUp.style.left;
              this.arrowDown.style.top = Math.round(bds.y + bds.height - this.tolerance) + 'px';
              mxUtils.setOpacity(this.arrowDown, this.inactiveOpacity);
              
              this.arrowLeft.style.left = Math.round(bds.x - this.triangleLeft.width - this.tolerance) + 'px';
              this.arrowLeft.style.top = this.arrowRight.style.top;
              mxUtils.setOpacity(this.arrowLeft, this.inactiveOpacity);
              
              if (this.checkCollisions)
              {
                  var right = this.graph.getCellAt(bds.x + bds.width +
                          this.triangleRight.width / 2, this.currentState.getCenterY());
                  var left = this.graph.getCellAt(bds.x - this.triangleLeft.width / 2, this.currentState.getCenterY()); 
                  var top = this.graph.getCellAt(this.currentState.getCenterX(), bds.y - this.triangleUp.height / 2); 
                  var bottom = this.graph.getCellAt(this.currentState.getCenterX(), bds.y + bds.height + this.triangleDown.height / 2); 

                  // Shows hover icons large cell is behind all directions of current cell
                  if (right != null && right == left && left == top && top == bottom)
                  {
                      right = null;
                      left = null;
                      top = null;
                      bottom = null;
                  }
                  
                  var currentGeo = this.graph.getCellGeometry(this.currentState.cell);
                  
                  var checkCollision = () => {
                      var geo = this.graph.model.isVertex(cell) && this.graph.getCellGeometry(cell);
                      
                      // Ignores collision if vertex is more than 3 times the size of this vertex
                      if (cell != null && !this.graph.model.isAncestor(cell, this.currentState.cell) &&
                          (geo == null || currentGeo == null || (geo.height < 6 * currentGeo.height &&
                          geo.width < 6 * currentGeo.width)))
                      {
                          arrow.style.visibility = 'hidden';
                      }
                      else
                      {
                          arrow.style.visibility = 'visible';
                      }
                  };
                  
                  checkCollision(right, this.arrowRight);
                  checkCollision(left, this.arrowLeft);
                  checkCollision(top, this.arrowUp);
                  checkCollision(bottom, this.arrowDown);
              }
              else
              {
                  this.arrowLeft.style.visibility = 'visible';
                  this.arrowRight.style.visibility = 'visible';
                  this.arrowUp.style.visibility = 'visible';
                  this.arrowDown.style.visibility = 'visible';
              }
              
              if (this.graph.tooltipHandler.isEnabled())
              {
                  this.arrowLeft.setAttribute('title', mxResources.get('plusTooltip'));
                  this.arrowRight.setAttribute('title', mxResources.get('plusTooltip'));
                  this.arrowUp.setAttribute('title', mxResources.get('plusTooltip'));
                  this.arrowDown.setAttribute('title', mxResources.get('plusTooltip'));
              }
              else
              {
                  this.arrowLeft.removeAttribute('title');
                  this.arrowRight.removeAttribute('title');
                  this.arrowUp.removeAttribute('title');
                  this.arrowDown.removeAttribute('title');
              }
          }
          else
          {
              this.reset();
          }
          
          // Updates bounding box
          if (this.currentState != null)
          {
              this.bbox = this.computeBoundingBox();
              
              // Adds tolerance for hover
              if (this.bbox != null)
              {
                  this.bbox.grow(10);
              }
          }
      }
  }

  computeBoundingBox() {
      var bbox = (!this.graph.model.isEdge(this.currentState.cell)) ? mxRectangle.fromRectangle(this.currentState) : null;
      
      this.visitNodes(function(elt)
      {
          if (elt.parentNode != null)
          {
              var tmp = new mxRectangle(elt.offsetLeft, elt.offsetTop, elt.offsetWidth, elt.offsetHeight);
              
              if (bbox == null)
              {
                  bbox = tmp;
              }
              else
              {
                  bbox.add(tmp);
              }
          }
      });
      
      return bbox;
  }

  getState(state) {
      if (state != null)
      {
          var cell = state.cell;
          
          if (!this.graph.getModel().contains(cell))
          {
              state = null;
          }
          else
          {
              // Uses connectable parent vertex if child is not connectable
              if (this.graph.getModel().isVertex(cell) && !this.graph.isCellConnectable(cell))
              {
                  var parent = this.graph.getModel().getParent(cell);
                  
                  if (this.graph.getModel().isVertex(parent) && this.graph.isCellConnectable(parent))
                  {
                      cell = parent;
                  }
              }
              
              // Ignores locked cells and edges
              if (this.graph.isCellLocked(cell) || this.graph.model.isEdge(cell))
              {
                  cell = null;
              }
              
              state = this.graph.view.getState(cell);
              
              if (state != null && state.style == null)
              {
                  state = null;
              }
          }
      }
      
      return state;
  }

  update(state, x, y) {
      if (!this.graph.connectionArrowsEnabled)
      {
          this.reset();
      }
      else
      {
          if (state != null && state.cell.geometry != null && state.cell.geometry.relative &&
              this.graph.model.isEdge(state.cell.parent))
          {
              state = null;
          }
          
          var timeOnTarget = null;
          
          // Time on target
          if (this.prev != state || this.isActive())
          {
              this.startTime = new Date().getTime();
              this.prev = state;
              timeOnTarget = 0;
      
              if (this.updateThread != null)
              {
                  window.clearTimeout(this.updateThread);
              }
              
              if (state != null)
              {
                  // Starts timer to update current state with no mouse events
                  this.updateThread = window.setTimeout(() => {
                      if (!this.isActive() && !this.graph.isMouseDown &&
                          !this.graph.panningHandler.isActive())
                      {
                          this.prev = state;
                          this.update(state, x, y);
                      }
                  }, this.updateDelay + 10);
              }
          }
          else if (this.startTime != null)
          {
              timeOnTarget = new Date().getTime() - this.startTime;
          }
          
          this.setDisplay('');
          
          if (this.currentState != null && this.currentState != state && timeOnTarget < this.activationDelay &&
              this.bbox != null && !mxUtils.contains(this.bbox, x, y))
          {
              this.reset(false);
          }
          else if (this.currentState != null || timeOnTarget > this.activationDelay)
          {
              if (this.currentState != state && ((timeOnTarget > this.updateDelay && state != null) ||
                  this.bbox == null || x == null || y == null || !mxUtils.contains(this.bbox, x, y)))
              {
                  if (state != null && this.graph.isEnabled())
                  {
                      this.removeNodes();
                      this.setCurrentState(state);
                      this.repaint();
                      
                      // Resets connection points on other focused cells
                      if (this.graph.connectionHandler.constraintHandler.currentFocus != state)
                      {
                          this.graph.connectionHandler.constraintHandler.reset();
                      }
                  }
                  else
                  {
                      this.reset();
                  }
              }
          }
      }
  }

  setCurrentState(state) {
      if (state.style['portConstraint'] != 'eastwest')
      {
          this.graph.container.appendChild(this.arrowUp);
          this.graph.container.appendChild(this.arrowDown);
      }

      this.graph.container.appendChild(this.arrowRight);
      this.graph.container.appendChild(this.arrowLeft);
      this.currentState = state;
  }

  mainHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-main.png', 17, 17) :
      Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/>');

  secondaryHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-secondary.png', 17, 17) :
      Graph.createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>');

  fixedHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-fixed.png', 17, 17) :
      Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>');

  terminalHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-terminal.png', 17, 17) :
      Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>');

  rotationHandle = new mxImage((mxClient.IS_SVG) ? 'data:image/png;base64,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' :
      IMAGE_PATH + '/handle-rotate.png', 19, 21);
}

export default HoverIcons
