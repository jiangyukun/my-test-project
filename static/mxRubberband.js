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
import mxCellEditor from 'mxgraph'
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

class mxRubberband {
  fadeOut = true;
  defaultOpacity = 30;

  isSpaceEvent(me) {
      return this.graph.isEnabled() && !this.graph.isCellLocked(this.graph.getDefaultParent()) &&
          mxEvent.isControlDown(me.getEvent()) && mxEvent.isShiftDown(me.getEvent());
  }

  mouseUp(sender, me) {
      var execute = this.div != null && this.div.style.display != 'none';

      var x0 = null;
      var y0 = null;
      var dx = null;
      var dy = null;

      if (this.first != null && this.currentX != null && this.currentY != null)
      {
          x0 = this.first.x;
          y0 = this.first.y;
          dx = (this.currentX - x0) / this.graph.view.scale;
          dy = (this.currentY - y0) / this.graph.view.scale;

          if (!mxEvent.isAltDown(me.getEvent()))
          {
              dx = this.graph.snap(dx);
              dy = this.graph.snap(dy);
              
              if (!this.graph.isGridEnabled())
              {
                  if (Math.abs(dx) < this.graph.tolerance)
                  {
                      dx = 0;
                  }
                  
                  if (Math.abs(dy) < this.graph.tolerance)
                  {
                      dy = 0;
                  }
              }
          }
      }
      
      this.reset();
      
      if (execute)
      {
          if (mxEvent.isAltDown(me.getEvent()) && this.graph.isToggleEvent(me.getEvent()))
          {
              var rect = new mxRectangle(this.x, this.y, this.width, this.height);
              var cells = this.graph.getCells(rect.x, rect.y, rect.width, rect.height);
              
              this.graph.removeSelectionCells(cells);
          }
          else if (this.isSpaceEvent(me))
          {
              this.graph.model.beginUpdate();
              try
              {
                  var cells = this.graph.getCellsBeyond(x0, y0, this.graph.getDefaultParent(), true, true);

                  for (var i = 0; i < cells.length; i++)
                  {
                      if (this.graph.isCellMovable(cells[i]))
                      {
                          var tmp = this.graph.view.getState(cells[i]);
                          var geo = this.graph.getCellGeometry(cells[i]);
                          
                          if (tmp != null && geo != null)
                          {
                              geo = geo.clone();
                              geo.translate(dx, dy);
                              this.graph.model.setGeometry(cells[i], geo);
                          }
                      }
                  }
              }
              finally
              {
                  this.graph.model.endUpdate();
              }
          }
          else
          {
              var rect = new mxRectangle(this.x, this.y, this.width, this.height);
              this.graph.selectRegion(rect, me.getEvent());
          }
          
          me.consume();
      }
  }

  mouseMove(sender, me) {
      if (!me.isConsumed() && this.first != null)
      {
          var origin = mxUtils.getScrollOrigin(this.graph.container);
          var offset = mxUtils.getOffset(this.graph.container);
          origin.x -= offset.x;
          origin.y -= offset.y;
          var x = me.getX() + origin.x;
          var y = me.getY() + origin.y;
          var dx = this.first.x - x;
          var dy = this.first.y - y;
          var tol = this.graph.tolerance;
          
          if (this.div != null || Math.abs(dx) > tol ||  Math.abs(dy) > tol)
          {
              if (this.div == null)
              {
                  this.div = this.createShape();
              }
              
              // Clears selection while rubberbanding. This is required because
              // the event is not consumed in mouseDown.
              mxUtils.clearSelection();
              this.update(x, y);
              
              if (this.isSpaceEvent(me))
              {
                  var right = this.x + this.width;
                  var bottom = this.y + this.height;
                  var scale = this.graph.view.scale;
                  
                  if (!mxEvent.isAltDown(me.getEvent()))
                  {
                      this.width = this.graph.snap(this.width / scale) * scale;
                      this.height = this.graph.snap(this.height / scale) * scale;
                      
                      if (!this.graph.isGridEnabled())
                      {
                          if (this.width < this.graph.tolerance)
                          {
                              this.width = 0;
                          }
                          
                          if (this.height < this.graph.tolerance)
                          {
                              this.height = 0;
                          }
                      }
                      
                      if (this.x < this.first.x)
                      {
                          this.x = right - this.width;
                      }
                      
                      if (this.y < this.first.y)
                      {
                          this.y = bottom - this.height;
                      }
                  }
                  
                  this.div.style.borderStyle = 'dashed';
                  this.div.style.backgroundColor = 'white';
                  this.div.style.left = this.x + 'px';
                  this.div.style.top = this.y + 'px';
                  this.div.style.width = Math.max(0, this.width) + 'px';
                  this.div.style.height = this.graph.container.clientHeight + 'px';
                  this.div.style.borderWidth = (this.width <= 0) ? '0px 1px 0px 0px' : '0px 1px 0px 1px';
                  
                  if (this.secondDiv == null)
                  {
                      this.secondDiv = this.div.cloneNode(true);
                      this.div.parentNode.appendChild(this.secondDiv);
                  }
                  
                  this.secondDiv.style.left = this.x + 'px';
                  this.secondDiv.style.top = this.y + 'px';
                  this.secondDiv.style.width = this.graph.container.clientWidth + 'px';
                  this.secondDiv.style.height = Math.max(0, this.height) + 'px';
                  this.secondDiv.style.borderWidth = (this.height <= 0) ? '1px 0px 0px 0px' : '1px 0px 1px 0px';
              }
              else
              {
                  // Hides second div and restores style
                  this.div.style.backgroundColor = '';
                  this.div.style.borderWidth = '';
                  this.div.style.borderStyle = '';
                  
                  if (this.secondDiv != null)
                  {
                      this.secondDiv.parentNode.removeChild(this.secondDiv);
                      this.secondDiv = null;
                  }
              }

              me.consume();
          }
      }
  }

  reset() {
      if (this.secondDiv != null)
      {
          this.secondDiv.parentNode.removeChild(this.secondDiv);
          this.secondDiv = null;
      }
      
      mxRubberbandReset.apply(this, arguments);
  }
}

export default mxRubberband
