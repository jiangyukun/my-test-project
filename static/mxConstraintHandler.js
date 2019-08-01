import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange, mxDictionary
, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler, mxImageShape
, mxRectangleShape } = mxGraph4

class mxConstraintHandler {
  createHighlightShape() {
      var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
      hl.opacity = mxConstants.HIGHLIGHT_OPACITY;
      
      return hl;
  }

  update(me, source) {
      if (this.isKeepFocusEvent(me) || !mxEvent.isAltDown(me.getEvent()))
      {
          mxConstraintHandlerUpdate.apply(this, arguments);
      }
      else
      {
          this.reset();
      }
  }

  pointImage = Graph.createSvgImage(5, 5, '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + HoverIcons.prototype.arrowFill + '"/>');

  getTolerance(me) {
      return (mxEvent.isMouseEvent(me.getEvent())) ? 4 : this.graph.getTolerance();
  }
}

export default mxConstraintHandler
