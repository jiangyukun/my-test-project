import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class ConnectionHandler extends mxConnectionHandler {
  isCreateTarget(evt) {
      return mxEvent.isControlDown(evt) || super.isCreateTarget(...arguments);
  }

  livePreview = true;
  cursor = 'crosshair';

  createEdgeState(me) {
      var style = this.graph.createCurrentEdgeStyle();
      var edge = this.graph.createEdge(null, null, null, null, null, style);
      var state = new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
      
      for (var key in this.graph.currentEdgeStyle)
      {
          state.style[key] = this.graph.currentEdgeStyle[key];
      }
      
      return state;
  }

  createShape() {
      var shape = super.createShape(...arguments);
      
      shape.isDashed = this.graph.currentEdgeStyle[mxConstants.STYLE_DASHED] == '1';
      
      return shape;
  }

  updatePreview(valid) {
      // do not change color of preview
  }

  createMarker() {
      var marker = super.createMarker(...arguments);
  
      var markerGetCell = marker.getCell;
      marker.getCell = mxUtils.bind(this, function(me)
      {
          var result = markerGetCell.apply(this, arguments);
      
          this.error = null;
          
          return result;
      });
      
      return marker;
  }

  isCellEnabled(cell) {
      return !this.graph.isCellLocked(cell);
  }

  outlineConnect = true;

  init() {
      super.init(...arguments);
      
      this.constraintHandler.isEnabled = () => {
          return this.graph.connectionHandler.isEnabled();
      };
  }
}

export default ConnectionHandler
