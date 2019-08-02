import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class Graph1 extends mxGraph {
  pageBreakColor = '#c0c0c0';
  pageScale = 1;

  pageFormat = (lang === 'en-us' || lang === 'en-ca' || lang === 'es-mx') ?
      mxConstants.PAGE_FORMAT_LETTER_PORTRAIT : mxConstants.PAGE_FORMAT_A4_PORTRAIT;

  updatePageBreaks(visible, width, height) {
      var useCssTranforms = this.useCssTransforms, scale = this.view.scale,
          translate = this.view.translate;

      if (useCssTranforms) {
          this.view.scale = 1;
          this.view.translate = new mxPoint(0, 0);
          this.useCssTransforms = false;
      }

      super.updatePageBreaks(...arguments);

      if (useCssTranforms) {
          this.view.scale = scale;
          this.view.translate = translate;
          this.useCssTransforms = true;
      }
  }
}

export default Graph1
