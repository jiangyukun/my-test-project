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

class mxConnector {
  paintLine(c, absPts, rounded) {
      // Required for checking dirty state
      this.routedPoints = (this.state != null) ? this.state.routedPoints : null;
      
      if (this.outline || this.state == null || this.style == null ||
          this.state.routedPoints == null || this.state.routedPoints.length == 0)
      {
          mxConnectorPaintLine.apply(this, arguments);
      }
      else
      {
          var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
              mxConstants.LINE_ARCSIZE) / 2;
          var size = (parseInt(mxUtils.getValue(this.style, 'jumpSize',
              Graph.defaultJumpSize)) - 2) / 2 + this.strokewidth;
          var style = mxUtils.getValue(this.style, 'jumpStyle', 'none');
          var f = Editor.jumpSizeRatio;
          var moveTo = true;
          var last = null;
          var len = null;
          var pts = [];
          var n = null;
          c.begin();
          
          for (var i = 0; i < this.state.routedPoints.length; i++)
          {
              var rpt = this.state.routedPoints[i];
              var pt = new mxPoint(rpt.x / this.scale, rpt.y / this.scale);
              
              // Takes first and last point from passed-in array
              if (i == 0)
              {
                  pt = absPts[0];
              }
              else if (i == this.state.routedPoints.length - 1)
              {
                  pt = absPts[absPts.length - 1];
              }
              
              var done = false;

              // Type 1 is an intersection
              if (last != null && rpt.type == 1)
              {
                  // Checks if next/previous points are too close
                  var next = this.state.routedPoints[i + 1];
                  var dx = next.x / this.scale - pt.x;
                  var dy = next.y / this.scale - pt.y;
                  var dist = dx * dx + dy * dy;

                  if (n == null)
                  {
                      n = new mxPoint(pt.x - last.x, pt.y - last.y);
                      len = Math.sqrt(n.x * n.x + n.y * n.y);
                      
                      if (len > 0)
                      {
                          n.x = n.x * size / len;
                          n.y = n.y * size / len;
                      }
                      else
                      {
                          n = null;
                      }
                  }
                  
                  if (dist > size * size && len > 0)
                  {
                      var dx = last.x - pt.x;
                      var dy = last.y - pt.y;
                      var dist = dx * dx + dy * dy;
                      
                      if (dist > size * size)
                      {
                          var p0 = new mxPoint(pt.x - n.x, pt.y - n.y);
                          var p1 = new mxPoint(pt.x + n.x, pt.y + n.y);
                          pts.push(p0);
                          
                          this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
                          
                          var f = (Math.round(n.x) < 0 || (Math.round(n.x) == 0
                                  && Math.round(n.y) <= 0)) ? 1 : -1;
                          moveTo = false;

                          if (style == 'sharp')
                          {
                              c.lineTo(p0.x - n.y * f, p0.y + n.x * f);
                              c.lineTo(p1.x - n.y * f, p1.y + n.x * f);
                              c.lineTo(p1.x, p1.y);
                          }
                          else if (style == 'arc')
                          {
                              f *= 1.3;
                              c.curveTo(p0.x - n.y * f, p0.y + n.x * f,
                                  p1.x - n.y * f, p1.y + n.x * f,
                                  p1.x, p1.y);
                          }
                          else
                          {
                              c.moveTo(p1.x, p1.y);
                              moveTo = true;
                          }
  
                          pts = [p1];
                          done = true;
                      }
                  }
              }
              else
              {
                  n = null;
              }
              
              if (!done)
              {
                  pts.push(pt);
                  last = pt;
              }
          }
          
          this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
          c.stroke();
      }
  }
}

export default mxConnector
