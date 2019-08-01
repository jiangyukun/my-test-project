import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange, mxDictionary
, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler, mxImageShape
, mxRectangleShape } = mxGraph4

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
