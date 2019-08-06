import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class GraphHandler extends mxGraphHandler {
  guidesEnabled = true;
  removeEmptyParents = true;

  moveCells(cells, dx, dy, clone, target, evt) {
      if (mxEvent.isAltDown(evt))
      {
          target = null;
      }
      
      super.moveCells(...arguments);
  }

  updateHint(me) {
      if (this.shape != null)
      {
          if (this.hint == null)
          {
              this.hint = createHint();
              this.graph.container.appendChild(this.hint);
          }

          var t = this.graph.view.translate;
          var s = this.graph.view.scale;
          var x = this.roundLength((this.bounds.x + this.currentDx) / s - t.x);
          var y = this.roundLength((this.bounds.y + this.currentDy) / s - t.y);
          
          this.hint.innerHTML = x + ', ' + y;

          this.hint.style.left = (this.shape.bounds.x + Math.round((this.shape.bounds.width - this.hint.clientWidth) / 2)) + 'px';
          this.hint.style.top = (this.shape.bounds.y + this.shape.bounds.height + 12) + 'px';
      }
  }

  removeHint() {
      if (this.hint != null)
      {
          this.hint.parentNode.removeChild(this.hint);
          this.hint = null;
      }
  }

  mouseDown(sender, me) {
      super.mouseDown(...arguments);

      if (mxEvent.isTouchEvent(me.getEvent()) && this.graph.isCellSelected(me.getCell()) &&
          this.graph.getSelectionCount() > 1)
      {
          this.delayedSelection = false;
      }
  }

  getBoundingBox(cells) {
      if (cells != null && cells.length == 1)
      {
          var model = this.graph.getModel();
          var parent = model.getParent(cells[0]);
          var geo = this.graph.getCellGeometry(cells[0]);
          
          if (model.isEdge(parent) && geo != null && geo.relative)
          {
              var state = this.graph.view.getState(cells[0]);
              
              if (state != null && state.width < 2 && state.height < 2 && state.text != null && state.text.boundingBox != null)
              {
                  return mxRectangle.fromRectangle(state.text.boundingBox);
              }
          }
      }
      
      return super.getBoundingBox(...arguments);
  }
}

export default GraphHandler
