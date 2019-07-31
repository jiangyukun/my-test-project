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

class mxGraphHandler {
  guidesEnabled = true;

  moveCells(cells, dx, dy, clone, target, evt) {
      if (mxEvent.isAltDown(evt))
      {
          target = null;
      }
      
      mxGraphHandlerMoveCells.apply(this, arguments);
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
      graphHandlerMouseDown.apply(this, arguments);

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
      
      return mxGraphHandlerGetBoundingBox.apply(this, arguments);
  }
}

export default mxGraphHandler
