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

class mxCellRenderer {
  isShapeInvalid(state, shape) {
      return mxCellRendererIsShapeInvalid.apply(this, arguments) ||
          (state.routedPoints != null && shape.routedPoints != null &&
          !mxUtils.equalPoints(shape.routedPoints, state.routedPoints))
  }

  createShape(state) {
      if (state.style != null && typeof(pako) !== 'undefined')
      {
          var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
  
          // Extracts and decodes stencil XML if shape has the form shape=stencil(value)
          if (shape != null && shape.substring(0, 8) == 'stencil(')
          {
              try
              {
                  var stencil = shape.substring(8, shape.length - 1);
                  var doc = mxUtils.parseXml(Graph.decompress(stencil));
                  
                  return new mxShape(new mxStencil(doc.documentElement));
              }
              catch (e)
              {
                  if (window.console != null)
                  {
                      console.log('Error in shape: ' + e);
                  }
              }
          }
      }
      
      return mxCellRendererCreateShape.apply(this, arguments);
  }

  initializeLabel(state) {
      if (state.text != null)
      {
          state.text.replaceLinefeeds = mxUtils.getValue(state.style, 'nl2Br', '1') != '0';
      }
      
      mxCellRendererInitializeLabel.apply(this, arguments);
  }
}

export default mxCellRenderer
