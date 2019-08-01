import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange, mxDictionary
, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler, mxImageShape
, mxRectangleShape } = mxGraph4

class mxStencil {
  evaluateTextAttribute(node, attribute, shape) {
      var result = mxStencilEvaluateTextAttribute.apply(this, arguments);
      var placeholders = node.getAttribute('placeholders');
      
      if (placeholders == '1' && shape.state != null)
      {
          result = shape.state.view.graph.replacePlaceholders(shape.state.cell, result);
      }
      
      return result;
  }
}

export default mxStencil
