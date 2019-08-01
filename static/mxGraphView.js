import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent, mxPoint
, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler, mxConnectionHandler
, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources, mxConnector
, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange, mxDictionary
, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler, mxImageShape
, mxRectangleShape } = mxGraph4

class mxGraphView {
  gridImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=' :
      IMAGE_PATH + '/grid.gif';

  gridSteps = 4;
  minGridSize = 4;
  gridColor = '#e0e0e0';

  getGraphBounds() {
      var b = this.graphBounds;
      
      if (this.graph.useCssTransforms)
      {
          var t = this.graph.currentTranslate;
          var s = this.graph.currentScale;

          b = new mxRectangle(
              (b.x + t.x) * s, (b.y + t.y) * s,
              b.width * s, b.height * s);
      }

      return b;
  }

  viewStateChanged() {
      if (this.graph.useCssTransforms)
      {
          this.validate();
          this.graph.sizeDidChange();
      }
      else
      {
          this.revalidate();
          this.graph.sizeDidChange();
      }
  }

  validate(cell) {
      if (this.graph.useCssTransforms)
      {
          this.graph.currentScale = this.scale;
          this.graph.currentTranslate.x = this.translate.x;
          this.graph.currentTranslate.y = this.translate.y;
          
          this.scale = 1;
          this.translate.x = 0;
          this.translate.y = 0;
      }
      
      graphViewValidate.apply(this, arguments);
      
      if (this.graph.useCssTransforms)
      {
          this.graph.updateCssTransform();
          
          this.scale = this.graph.currentScale;
          this.translate.x = this.graph.currentTranslate.x;
          this.translate.y = this.graph.currentTranslate.y;
      }
  }

  validateBackgroundPage() {
      var useCssTranforms = this.graph.useCssTransforms, scale = this.scale, 
          translate = this.translate;
      
      if (useCssTranforms)
      {
          this.scale = this.graph.currentScale;
          this.translate = this.graph.currentTranslate;
      }
      
      graphViewValidateBackgroundPage.apply(this, arguments);
      
      if (useCssTranforms)
      {
          this.scale = scale;
          this.translate = translate;
      }
  }

  resetValidationState() {
      mxGraphViewResetValidationState.apply(this, arguments);
      
      this.validEdges = [];
  }

  validateCellState(cell, recurse) {
      recurse = (recurse != null) ? recurse : true;
      var state = this.getState(cell);
      
      // Forces repaint if jumps change on a valid edge
      if (state != null && recurse && this.graph.model.isEdge(state.cell) &&
          state.style != null && state.style[mxConstants.STYLE_CURVED] != 1 &&
          !state.invalid && this.updateLineJumps(state))
      {
          this.graph.cellRenderer.redraw(state, false, this.isRendering());
      }
      
      state = mxGraphViewValidateCellState.apply(this, arguments);
      
      // Adds to the list of edges that may intersect with later edges
      if (state != null && recurse && this.graph.model.isEdge(state.cell) &&
          state.style != null && state.style[mxConstants.STYLE_CURVED] != 1)
      {
          // LATER: Reuse jumps for valid edges
          this.validEdges.push(state);
      }
      
      return state;
  }

  updateCellState(state) {
      mxGraphViewUpdateCellState.apply(this, arguments);

      // Updates jumps on invalid edge before repaint
      if (this.graph.model.isEdge(state.cell) &&
          state.style[mxConstants.STYLE_CURVED] != 1)
      {
          this.updateLineJumps(state);
      }
  }

  updateLineJumps(state) {
      var pts = state.absolutePoints;
      
      if (Graph.lineJumpsEnabled)
      {
          var changed = state.routedPoints != null;
          var actual = null;
          
          if (pts != null && this.validEdges != null &&
              mxUtils.getValue(state.style, 'jumpStyle', 'none') !== 'none')
          {
              var thresh = 0.5 * this.scale;
              changed = false;
              actual = [];
              
              // Type 0 means normal waypoint, 1 means jump
              function addPoint(type, x, y)
              {
                  var rpt = new mxPoint(x, y);
                  rpt.type = type;
                  
                  actual.push(rpt);
                  var curr = (state.routedPoints != null) ? state.routedPoints[actual.length - 1] : null;
                  
                  return curr == null || curr.type != type || curr.x != x || curr.y != y;
              };
              
              for (var i = 0; i < pts.length - 1; i++)
              {
                  var p1 = pts[i + 1];
                  var p0 = pts[i];
                  var list = [];
                  
                  // Ignores waypoints on straight segments
                  var pn = pts[i + 2];
                  
                  while (i < pts.length - 2 &&
                      mxUtils.ptSegDistSq(p0.x, p0.y, pn.x, pn.y,
                      p1.x, p1.y) < 1 * this.scale * this.scale)
                  {
                      p1 = pn;
                      i++;
                      pn = pts[i + 2];
                  }
                  
                  changed = addPoint(0, p0.x, p0.y) || changed;
                  
                  // Processes all previous edges
                  for (var e = 0; e < this.validEdges.length; e++)
                  {
                      var state2 = this.validEdges[e];
                      var pts2 = state2.absolutePoints;
                      
                      if (pts2 != null && mxUtils.intersects(state, state2) && state2.style['noJump'] != '1')
                      {
                          // Compares each segment of the edge with the current segment
                          for (var j = 0; j < pts2.length - 1; j++)
                          {
                              var p3 = pts2[j + 1];
                              var p2 = pts2[j];
                              
                              // Ignores waypoints on straight segments
                              pn = pts2[j + 2];
                              
                              while (j < pts2.length - 2 &&
                                  mxUtils.ptSegDistSq(p2.x, p2.y, pn.x, pn.y,
                                  p3.x, p3.y) < 1 * this.scale * this.scale)
                              {
                                  p3 = pn;
                                  j++;
                                  pn = pts2[j + 2];
                              }
                              
                              var pt = mxUtils.intersection(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  
                              // Handles intersection between two segments
                              if (pt != null && (Math.abs(pt.x - p0.x) > thresh ||
                                  Math.abs(pt.y - p0.y) > thresh) &&
                                  (Math.abs(pt.x - p1.x) > thresh ||
                                  Math.abs(pt.y - p1.y) > thresh) &&
                                  (Math.abs(pt.x - p2.x) > thresh ||
                                  Math.abs(pt.y - p2.y) > thresh) &&
                                  (Math.abs(pt.x - p3.x) > thresh ||
                                  Math.abs(pt.y - p3.y) > thresh))
                              {
                                  var dx = pt.x - p0.x;
                                  var dy = pt.y - p0.y;
                                  var temp = {distSq: dx * dx + dy * dy, x: pt.x, y: pt.y};
                              
                                  // Intersections must be ordered by distance from start of segment
                                  for (var t = 0; t < list.length; t++)
                                  {
                                      if (list[t].distSq > temp.distSq)
                                      {
                                          list.splice(t, 0, temp);
                                          temp = null;
                                          
                                          break;
                                      }
                                  }
                                  
                                  // Ignores multiple intersections at segment joint
                                  if (temp != null && (list.length == 0 ||
                                      list[list.length - 1].x !== temp.x ||
                                      list[list.length - 1].y !== temp.y))
                                  {
                                      list.push(temp);
                                  }
                              }
                          }
                      }
                  }
                  
                  // Adds ordered intersections to routed points
                  for (var j = 0; j < list.length; j++)
                  {
                      changed = addPoint(1, list[j].x, list[j].y) || changed;
                  }
              }
  
              var pt = pts[pts.length - 1];
              changed = addPoint(0, pt.x, pt.y) || changed;
          }
          
          state.routedPoints = actual;
          
          return changed;
      }
      else
      {
          return false;
      }
  }

  updateFloatingTerminalPoint(edge, start, end, source) {
      if (start != null && edge != null &&
          (start.style['snapToPoint'] == '1' ||
          edge.style['snapToPoint'] == '1'))
      {
          start = this.getTerminalPort(edge, start, source);
          var next = this.getNextPoint(edge, end, source);
          
          var orth = this.graph.isOrthogonal(edge);
          var alpha = mxUtils.toRadians(Number(start.style[mxConstants.STYLE_ROTATION] || '0'));
          var center = new mxPoint(start.getCenterX(), start.getCenterY());
          
          if (alpha != 0)
          {
              var cos = Math.cos(-alpha);
              var sin = Math.sin(-alpha);
              next = mxUtils.getRotatedPoint(next, cos, sin, center);
          }
          
          var border = parseFloat(edge.style[mxConstants.STYLE_PERIMETER_SPACING] || 0);
          border += parseFloat(edge.style[(source) ?
              mxConstants.STYLE_SOURCE_PERIMETER_SPACING :
              mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0);
          var pt = this.getPerimeterPoint(start, next, alpha == 0 && orth, border);
      
          if (alpha != 0)
          {
              var cos = Math.cos(alpha);
              var sin = Math.sin(alpha);
              pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
          }
          
          edge.setAbsoluteTerminalPoint(this.snapToAnchorPoint(edge, start, end, source, pt), source);
      }
      else
      {
          mxGraphViewUpdateFloatingTerminalPoint.apply(this, arguments);
      }
  }

  snapToAnchorPoint(edge, start, end, source, pt) {
      if (start != null && edge != null)
      {
          var constraints = this.graph.getAllConnectionConstraints(start)
          var nearest = null;
          var dist = null;
      
          if (constraints != null)
          {
              for (var i = 0; i < constraints.length; i++)
              {
                  var cp = this.graph.getConnectionPoint(start, constraints[i]);
                  
                  if (cp != null)
                  {
                      var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);
                  
                      if (dist == null || tmp < dist)
                      {
                          nearest = cp;
                          dist = tmp;
                      }
                  }
              }
          }
          
          if (nearest != null)
          {
              pt = nearest;
          }
      }
      
      return pt;
  }
}

export default mxGraphView
