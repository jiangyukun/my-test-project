import mxConstants from 'mxgraph'
import mxGraph from 'mxgraph'
import mxText from 'mxgraph'
import mxGraphModel from 'mxgraph'
import mxGraphView from 'mxgraph'
import mxClient from 'mxgraph'
import mxSvgCanvas2D from 'mxgraph'
import mxShape from 'mxgraph'
import mxUtils from 'mxgraph'
import mxEvent from 'mxgraph'
import mxPoint from 'mxgraph'
import mxEdgeStyle from 'mxgraph'
import mxRectangle from 'mxgraph'
import mxEdgeHandler from 'mxgraph'
import mxCellRenderer from 'mxgraph'
import mxVertexHandler from 'mxgraph'
import mxDragSource from 'mxgraph'
import mxPopupMenu from 'mxgraph'
import mxGuide from 'mxgraph'
import mxGraphHandler from 'mxgraph'
import mxConnectionHandler from 'mxgraph'
import mxRubberband from 'mxgraph'
import mxImage from 'mxgraph'
import mxCellHighlight from 'mxgraph'
import mxLayoutManager from 'mxgraph'
import mxStackLayout from 'mxgraph'
import mxCompactTreeLayout from 'mxgraph'
import mxHierarchicalLayout from 'mxgraph'
import mxEventObject from 'mxgraph'
import mxResources from 'mxgraph'
import mxGraphViewResetValidationState from 'mxgraph'
import mxGraphViewValidateCellState from 'mxgraph'
import mxCellRendererIsShapeInvalid from 'mxgraph'
import mxGraphViewUpdateCellState from 'mxgraph'
import mxConnectorPaintLine from 'mxgraph'
import mxConnector from 'mxgraph'
import mxGraphViewUpdateFloatingTerminalPoint from 'mxgraph'
import mxStencilEvaluateTextAttribute from 'mxgraph'
import mxStencil from 'mxgraph'
import mxCellRendererCreateShape from 'mxgraph'
import mxStencilRegistry from 'mxgraph'
import mxConnectionHandlerCreateTarget from 'mxgraph'
import mxConstraintHandler from 'mxgraph'
import mxEllipse from 'mxgraph'
import mxCellState from 'mxgraph'
import mxConnectionHandlerCreateMarker from 'mxgraph'
import mxStyleRegistry from 'mxgraph'
import mxCodec from 'mxgraph'
import mxConnectionConstraint from 'mxgraph'
import mxValueChange from 'mxgraph'
import mxDictionary from 'mxgraph'
import mxCell from 'mxgraph'
import mxGeometry from 'mxgraph'
import mxImageExport from 'mxgraph'
import mxPopupMenuHandler from 'mxgraph'
import mxCellRendererInitializeLabel from 'mxgraph'
import mxConstraintHandlerUpdate from 'mxgraph'
import mxPolyline from 'mxgraph'
import mxCellEditorStartEditing from 'mxgraph'
import mxCellEditorResize from 'mxgraph'
import mxCellEditorGetInitialValue from 'mxgraph'
import mxCellEditorGetCurrentValue from 'mxgraph'
import mxCellEditorStopEditing from 'mxgraph'
import mxCellEditorApplyValue from 'mxgraph'
import mxGraphHandlerMoveCells from 'mxgraph'
import mxOutline from 'mxgraph'
import mxPanningHandler from 'mxgraph'
import mxRubberbandReset from 'mxgraph'
import mxEdgeHandlerUpdatePreviewState from 'mxgraph'
import mxEdgeHandlerIsOutlineConnectEvent from 'mxgraph'
import mxElbowEdgeHandler from 'mxgraph'
import mxImageShape from 'mxgraph'
import mxRectangleShape from 'mxgraph'
import mxGraphHandlerGetBoundingBox from 'mxgraph'
import mxVertexHandlerGetSelectionBounds from 'mxgraph'
import mxVertexHandlerMouseDown from 'mxgraph'

class mxCellEditor {
  isContentEditing() {
      var state = this.graph.view.getState(this.editingCell);
      
      return state != null && state.style['html'] == 1;
  }

  saveSelection() {
      if (window.getSelection)
      {
          var sel = window.getSelection();
          
          if (sel.getRangeAt && sel.rangeCount)
          {
              var ranges = [];
              
              for (var i = 0, len = sel.rangeCount; i < len; ++i)
              {
                  ranges.push(sel.getRangeAt(i));
              }
              
              return ranges;
          }
      }
      else if (document.selection && document.selection.createRange)
      {
          return document.selection.createRange();
      }
      
      return null;
  }

  restoreSelection(savedSel) {
      try
      {
          if (savedSel)
          {
              if (window.getSelection)
              {
                  sel = window.getSelection();
                  sel.removeAllRanges();
  
                  for (var i = 0, len = savedSel.length; i < len; ++i)
                  {
                      sel.addRange(savedSel[i]);
                  }
              }
              else if (document.selection && savedSel.select)
              {
                  savedSel.select();
              }
          }
      }
      catch (e)
      {
          // ignore
      }
  }

  escapeCancelsEditing = false;

  startEditing(cell, trigger) {
      mxCellEditorStartEditing.apply(this, arguments);
      
      // Overrides class in case of HTML content to add
      // dashed borders for divs and table cells
      var state = this.graph.view.getState(cell);

      if (state != null && state.style['html'] == 1)
      {
          this.textarea.className = 'mxCellEditor geContentEditable';
      }
      else
      {
          this.textarea.className = 'mxCellEditor mxPlainTextEditor';
      }
      
      // Toggles markup vs wysiwyg mode
      this.codeViewMode = false;
      
      // Stores current selection range when switching between markup and code
      this.switchSelectionState = null;
      
      // Selects editing cell
      this.graph.setSelectionCell(cell);

      // Enables focus outline for edges and edge labels
      var parent = this.graph.getModel().getParent(cell);
      var geo = this.graph.getCellGeometry(cell);
      
      if ((this.graph.getModel().isEdge(parent) && geo != null && geo.relative) ||
          this.graph.getModel().isEdge(cell))
      {
          // Quirks does not support outline at all so use border instead
          if (mxClient.IS_QUIRKS)
          {
              this.textarea.style.border = 'gray dotted 1px';
          }
          // IE>8 and FF on Windows uses outline default of none
          else if (mxClient.IS_IE || mxClient.IS_IE11 || (mxClient.IS_FF && mxClient.IS_WIN))
          {
              this.textarea.style.outline = 'gray dotted 1px';
          }
          else
          {
              this.textarea.style.outline = '';
          }
      }
      else if (mxClient.IS_QUIRKS)
      {
          this.textarea.style.outline = 'none';
          this.textarea.style.border = '';
      }
  }

  installListeners(elt) {
      cellEditorInstallListeners.apply(this, arguments);

      // Adds a reference from the clone to the original node, recursively
      function reference(node, clone)
      {
          clone.originalNode = node;
          
          node = node.firstChild;
          var child = clone.firstChild;
          
          while (node != null && child != null)
          {
              reference(node, child);
              node = node.nextSibling;
              child = child.nextSibling;
          }
          
          return clone;
      };
      
      // Checks the given node for new nodes, recursively
      function checkNode(node, clone)
      {
          if (node != null)
          {
              if (clone.originalNode != node)
              {
                  cleanNode(node);
              }
              else
              {
                  node = node.firstChild;
                  clone = clone.firstChild;
                  
                  while (node != null)
                  {
                      var nextNode = node.nextSibling;
                      
                      if (clone == null)
                      {
                          cleanNode(node);
                      }
                      else
                      {
                          checkNode(node, clone);
                          clone = clone.nextSibling;
                      }

                      node = nextNode;
                  }
              }
          }
      };

      // Removes unused DOM nodes and attributes, recursively
      function cleanNode(node)
      {
          var child = node.firstChild;
          
          while (child != null)
          {
              var next = child.nextSibling;
              cleanNode(child);
              child = next;
          }
          
          if ((node.nodeType != 1 || (node.nodeName !== 'BR' && node.firstChild == null)) &&
              (node.nodeType != 3 || mxUtils.trim(mxUtils.getTextContent(node)).length == 0))
          {
              node.parentNode.removeChild(node);
          }
          else
          {
              // Removes linefeeds
              if (node.nodeType == 3)
              {
                  mxUtils.setTextContent(node, mxUtils.getTextContent(node).replace(/\n|\r/g, ''));
              }

              // Removes CSS classes and styles (for Word and Excel)
              if (node.nodeType == 1)
              {
                  node.removeAttribute('style');
                  node.removeAttribute('class');
                  node.removeAttribute('width');
                  node.removeAttribute('cellpadding');
                  node.removeAttribute('cellspacing');
                  node.removeAttribute('border');
              }
          }
      };
      
      // Handles paste from Word, Excel etc by removing styles, classnames and unused nodes
      // LATER: Fix undo/redo for paste
      if (!mxClient.IS_QUIRKS && document.documentMode !== 7 && document.documentMode !== 8)
      {
          mxEvent.addListener(this.textarea, 'paste', mxUtils.bind(this, function(evt)
          {
              var clone = reference(this.textarea, this.textarea.cloneNode(true));

              window.setTimeout(mxUtils.bind(this, function()
              {
                  checkNode(this.textarea, clone);
              }), 0);
          }));
      }
  }

  toggleViewMode() {
      var state = this.graph.view.getState(this.editingCell);
      
      if (state != null)
      {
          var nl2Br = state != null && mxUtils.getValue(state.style, 'nl2Br', '1') != '0';
          var tmp = this.saveSelection();
          
          if (!this.codeViewMode)
          {
              // Clears the initial empty label on the first keystroke
              if (this.clearOnChange && this.textarea.innerHTML == this.getEmptyLabelText())
              {
                  this.clearOnChange = false;
                  this.textarea.innerHTML = '';
              }
              
              // Removes newlines from HTML and converts breaks to newlines
              // to match the HTML output in plain text
              var content = mxUtils.htmlEntities(this.textarea.innerHTML);
  
              // Workaround for trailing line breaks being ignored in the editor
              if (!mxClient.IS_QUIRKS && document.documentMode != 8)
              {
                  content = mxUtils.replaceTrailingNewlines(content, '<div><br></div>');
              }
              
              content = this.graph.sanitizeHtml((nl2Br) ? content.replace(/\n/g, '').replace(/&lt;br\s*.?&gt;/g, '<br>') : content, true);
              this.textarea.className = 'mxCellEditor mxPlainTextEditor';
              
              var size = mxConstants.DEFAULT_FONTSIZE;
              
              this.textarea.style.lineHeight = (mxConstants.ABSOLUTE_LINE_HEIGHT) ? Math.round(size * mxConstants.LINE_HEIGHT) + 'px' : mxConstants.LINE_HEIGHT;
              this.textarea.style.fontSize = Math.round(size) + 'px';
              this.textarea.style.textDecoration = '';
              this.textarea.style.fontWeight = 'normal';
              this.textarea.style.fontStyle = '';
              this.textarea.style.fontFamily = mxConstants.DEFAULT_FONTFAMILY;
              this.textarea.style.textAlign = 'left';
              
              // Adds padding to make cursor visible with borders
              this.textarea.style.padding = '2px';
              
              if (this.textarea.innerHTML != content)
              {
                  this.textarea.innerHTML = content;
              }
  
              this.codeViewMode = true;
          }
          else
          {
              var content = mxUtils.extractTextWithWhitespace(this.textarea.childNodes);
              
              // Strips trailing line break
              if (content.length > 0 && content.charAt(content.length - 1) == '\n')
              {
                  content = content.substring(0, content.length - 1);
              }
              
              content = this.graph.sanitizeHtml((nl2Br) ? content.replace(/\n/g, '<br/>') : content, true)
              this.textarea.className = 'mxCellEditor geContentEditable';
              
              var size = mxUtils.getValue(state.style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
              var family = mxUtils.getValue(state.style, mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY);
              var align = mxUtils.getValue(state.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_LEFT);
              var bold = (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
                      mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD;
              var italic = (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
                      mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC;
              var uline = (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
                      mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE;
              
              this.textarea.style.lineHeight = (mxConstants.ABSOLUTE_LINE_HEIGHT) ? Math.round(size * mxConstants.LINE_HEIGHT) + 'px' : mxConstants.LINE_HEIGHT;
              this.textarea.style.fontSize = Math.round(size) + 'px';
              this.textarea.style.textDecoration = (uline) ? 'underline' : '';
              this.textarea.style.fontWeight = (bold) ? 'bold' : 'normal';
              this.textarea.style.fontStyle = (italic) ? 'italic' : '';
              this.textarea.style.fontFamily = family;
              this.textarea.style.textAlign = align;
              this.textarea.style.padding = '0px';
              
              if (this.textarea.innerHTML != content)
              {
                  this.textarea.innerHTML = content;
                  
                  if (this.textarea.innerHTML.length == 0)
                  {
                      this.textarea.innerHTML = this.getEmptyLabelText();
                      this.clearOnChange = this.textarea.innerHTML.length > 0;
                  }
              }
  
              this.codeViewMode = false;
          }
          
          this.textarea.focus();
      
          if (this.switchSelectionState != null)
          {
              this.restoreSelection(this.switchSelectionState);
          }
          
          this.switchSelectionState = tmp;
          this.resize();
      }
  }

  resize(state, trigger) {
      if (this.textarea != null)
      {
          var state = this.graph.getView().getState(this.editingCell);
          
          if (this.codeViewMode && state != null)
          {
              var scale = state.view.scale;
              this.bounds = mxRectangle.fromRectangle(state);
              
              // General placement of code editor if cell has no size
              // LATER: Fix HTML editor bounds for edge labels
              if (this.bounds.width == 0 && this.bounds.height == 0)
              {
                  this.bounds.width = 160 * scale;
                  this.bounds.height = 60 * scale;
                  
                  var m = (state.text != null) ? state.text.margin : null;
                  
                  if (m == null)
                  {
                      m = mxUtils.getAlignmentAsPoint(mxUtils.getValue(state.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER),
                              mxUtils.getValue(state.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE));
                  }
                  
                  this.bounds.x += m.x * this.bounds.width;
                  this.bounds.y += m.y * this.bounds.height;
              }
  
              this.textarea.style.width = Math.round((this.bounds.width - 4) / scale) + 'px';
              this.textarea.style.height = Math.round((this.bounds.height - 4) / scale) + 'px';
              this.textarea.style.overflow = 'auto';
  
              // Adds scrollbar offset if visible
              if (this.textarea.clientHeight < this.textarea.offsetHeight)
              {
                  this.textarea.style.height = Math.round((this.bounds.height / scale)) + (this.textarea.offsetHeight - this.textarea.clientHeight) + 'px';
                  this.bounds.height = parseInt(this.textarea.style.height) * scale;
              }
              
              if (this.textarea.clientWidth < this.textarea.offsetWidth)
              {
                  this.textarea.style.width = Math.round((this.bounds.width / scale)) + (this.textarea.offsetWidth - this.textarea.clientWidth) + 'px';
                  this.bounds.width = parseInt(this.textarea.style.width) * scale;
              }
                              
              this.textarea.style.left = Math.round(this.bounds.x) + 'px';
              this.textarea.style.top = Math.round(this.bounds.y) + 'px';
  
              if (mxClient.IS_VML)
              {
                  this.textarea.style.zoom = scale;
              }
              else
              {
                  mxUtils.setPrefixedStyle(this.textarea.style, 'transform', 'scale(' + scale + ',' + scale + ')');	
              }
          }
          else
          {
              this.textarea.style.height = '';
              this.textarea.style.overflow = '';
              mxCellEditorResize.apply(this, arguments);
          }
      }
  }

  getInitialValue(state, trigger) {
      if (mxUtils.getValue(state.style, 'html', '0') == '0')
      {
          return mxCellEditorGetInitialValue.apply(this, arguments);
      }
      else
      {
          var result = this.graph.getEditingValue(state.cell, trigger)
      
          if (mxUtils.getValue(state.style, 'nl2Br', '1') == '1')
          {
              result = result.replace(/\n/g, '<br/>');
          }
          
          result = this.graph.sanitizeHtml(result, true);
          
          return result;
      }
  }

  getCurrentValue(state) {
      if (mxUtils.getValue(state.style, 'html', '0') == '0')
      {
          return mxCellEditorGetCurrentValue.apply(this, arguments);
      }
      else
      {
          var result = this.graph.sanitizeHtml(this.textarea.innerHTML, true);

          if (mxUtils.getValue(state.style, 'nl2Br', '1') == '1')
          {
              result = result.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
          }
          else
          {
              result = result.replace(/\r\n/g, '').replace(/\n/g, '');
          }
          
          return result;
      }
  }

  stopEditing(cancel) {
      // Restores default view mode before applying value
      if (this.codeViewMode)
      {
          this.toggleViewMode();
      }
      
      mxCellEditorStopEditing.apply(this, arguments);
      
      // Tries to move focus back to container after editing if possible
      this.focusContainer();
  }

  focusContainer() {
      try
      {
          this.graph.container.focus();
      }
      catch (e)
      {
          // ignore
      }
  }

  applyValue(state, value) {
      // Removes empty relative child labels in edges
      this.graph.getModel().beginUpdate();
      
      try
      {
          mxCellEditorApplyValue.apply(this, arguments);
          
          if (this.graph.isCellDeletable(state.cell) && this.graph.model.getChildCount(state.cell) == 0)
          {
              var stroke = mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE);
              var fill = mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
              
              if (value == '' && stroke == mxConstants.NONE && fill == mxConstants.NONE)
              {
                  this.graph.removeCells([state.cell], false);
              }
          }
      }
      finally
      {
          this.graph.getModel().endUpdate();
      }
  }

  getBackgroundColor(state) {
      var color = null;
      
      if (this.graph.getModel().isEdge(state.cell) || this.graph.getModel().isEdge(this.graph.getModel().getParent(state.cell)))
      {
          var color = mxUtils.getValue(state.style, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, null);
          
          if (color == mxConstants.NONE)
          {
              color = null;
          }
      }
      
      return color;
  }

  getMinimumSize(state) {
      var scale = this.graph.getView().scale;
      
      return new mxRectangle(0, 0, (state.text == null) ? 30 :  state.text.size * scale + 20, 30);
  }
}

export default mxCellEditor
