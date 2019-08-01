import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class PanningHandler extends mxPanningHandler {
  isPanningTrigger(me) {
      var evt = me.getEvent();
      
      return (me.getState() == null && !mxEvent.isMouseEvent(evt)) ||
          (mxEvent.isPopupTrigger(evt) && (me.getState() == null ||
          mxEvent.isControlDown(evt) || mxEvent.isShiftDown(evt)));
  }

  isPanningTrigger(me) {
      var evt = me.getEvent();
      
      return (mxEvent.isLeftMouseButton(evt) && ((this.useLeftButtonForPanning &&
              me.getState() == null) || (mxEvent.isControlDown(evt) &&
              !mxEvent.isShiftDown(evt)))) || (this.usePopupTrigger &&
              mxEvent.isPopupTrigger(evt));
  }
}

export default PanningHandler
