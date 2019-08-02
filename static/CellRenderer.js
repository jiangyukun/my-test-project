import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class CellRenderer extends mxCellRenderer {
  isShapeInvalid(state, shape) {
      return super.isShapeInvalid(...arguments) ||
          (state.routedPoints != null && shape.routedPoints != null &&
              !mxUtils.equalPoints(shape.routedPoints, state.routedPoints));
  }

  createShape(state) {
      if (state.style != null && typeof (pako) !== 'undefined') {
          var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

          // Extracts and decodes stencil XML if shape has the form shape=stencil(value)
          if (shape != null && typeof shape === 'string' && shape.substring(0, 8) == 'stencil(') {
              try {
                  var stencil = shape.substring(8, shape.length - 1);
                  var doc = mxUtils.parseXml(Graph.decompress(stencil));

                  return new mxShape(new mxStencil(doc.documentElement));
              } catch (e) {
                  if (window.console != null) {
                      console.log('Error in shape: ' + e);
                  }
              }
          }
      }

      return super.createShape(...arguments);
  }

  initializeLabel(state) {
      if (state.text != null) {
          state.text.replaceLinefeeds = mxUtils.getValue(state.style, 'nl2Br', '1') != '0';
      }

      super.initializeLabel(...arguments);
  }
}

export default CellRenderer
