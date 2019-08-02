import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class Rubberband extends mxRubberband {
  fadeOut = true;
  defaultOpacity = 30;

  isSpaceEvent(me) {
      return this.graph.isEnabled() && !this.graph.isCellLocked(this.graph.getDefaultParent()) &&
          mxEvent.isControlDown(me.getEvent()) && mxEvent.isShiftDown(me.getEvent());
  }

  mouseUp(sender, me) {
      var execute = this.div != null && this.div.style.display != 'none';

      var x0 = null;
      var y0 = null;
      var dx = null;
      var dy = null;

      if (this.first != null && this.currentX != null && this.currentY != null) {
          x0 = this.first.x;
          y0 = this.first.y;
          dx = (this.currentX - x0) / this.graph.view.scale;
          dy = (this.currentY - y0) / this.graph.view.scale;

          if (!mxEvent.isAltDown(me.getEvent())) {
              dx = this.graph.snap(dx);
              dy = this.graph.snap(dy);

              if (!this.graph.isGridEnabled()) {
                  if (Math.abs(dx) < this.graph.tolerance) {
                      dx = 0;
                  }

                  if (Math.abs(dy) < this.graph.tolerance) {
                      dy = 0;
                  }
              }
          }
      }

      this.reset();

      if (execute) {
          if (mxEvent.isAltDown(me.getEvent()) && this.graph.isToggleEvent(me.getEvent())) {
              var rect = new mxRectangle(this.x, this.y, this.width, this.height);
              var cells = this.graph.getCells(rect.x, rect.y, rect.width, rect.height);

              this.graph.removeSelectionCells(cells);
          } else if (this.isSpaceEvent(me)) {
              this.graph.model.beginUpdate();
              try {
                  var cells = this.graph.getCellsBeyond(x0, y0, this.graph.getDefaultParent(), true, true);

                  for (var i = 0; i < cells.length; i++) {
                      if (this.graph.isCellMovable(cells[i])) {
                          var tmp = this.graph.view.getState(cells[i]);
                          var geo = this.graph.getCellGeometry(cells[i]);

                          if (tmp != null && geo != null) {
                              geo = geo.clone();
                              geo.translate(dx, dy);
                              this.graph.model.setGeometry(cells[i], geo);
                          }
                      }
                  }
              } finally {
                  this.graph.model.endUpdate();
              }
          } else {
              var rect = new mxRectangle(this.x, this.y, this.width, this.height);
              this.graph.selectRegion(rect, me.getEvent());
          }

          me.consume();
      }
  }

  mouseMove(sender, me) {
      if (!me.isConsumed() && this.first != null) {
          var origin = mxUtils.getScrollOrigin(this.graph.container);
          var offset = mxUtils.getOffset(this.graph.container);
          origin.x -= offset.x;
          origin.y -= offset.y;
          var x = me.getX() + origin.x;
          var y = me.getY() + origin.y;
          var dx = this.first.x - x;
          var dy = this.first.y - y;
          var tol = this.graph.tolerance;

          if (this.div != null || Math.abs(dx) > tol || Math.abs(dy) > tol) {
              if (this.div == null) {
                  this.div = this.createShape();
              }

              // Clears selection while rubberbanding. This is required because
              // the event is not consumed in mouseDown.
              mxUtils.clearSelection();
              this.update(x, y);

              if (this.isSpaceEvent(me)) {
                  var right = this.x + this.width;
                  var bottom = this.y + this.height;
                  var scale = this.graph.view.scale;

                  if (!mxEvent.isAltDown(me.getEvent())) {
                      this.width = this.graph.snap(this.width / scale) * scale;
                      this.height = this.graph.snap(this.height / scale) * scale;

                      if (!this.graph.isGridEnabled()) {
                          if (this.width < this.graph.tolerance) {
                              this.width = 0;
                          }

                          if (this.height < this.graph.tolerance) {
                              this.height = 0;
                          }
                      }

                      if (this.x < this.first.x) {
                          this.x = right - this.width;
                      }

                      if (this.y < this.first.y) {
                          this.y = bottom - this.height;
                      }
                  }

                  this.div.style.borderStyle = 'dashed';
                  this.div.style.backgroundColor = 'white';
                  this.div.style.left = this.x + 'px';
                  this.div.style.top = this.y + 'px';
                  this.div.style.width = Math.max(0, this.width) + 'px';
                  this.div.style.height = this.graph.container.clientHeight + 'px';
                  this.div.style.borderWidth = (this.width <= 0) ? '0px 1px 0px 0px' : '0px 1px 0px 1px';

                  if (this.secondDiv == null) {
                      this.secondDiv = this.div.cloneNode(true);
                      this.div.parentNode.appendChild(this.secondDiv);
                  }

                  this.secondDiv.style.left = this.x + 'px';
                  this.secondDiv.style.top = this.y + 'px';
                  this.secondDiv.style.width = this.graph.container.clientWidth + 'px';
                  this.secondDiv.style.height = Math.max(0, this.height) + 'px';
                  this.secondDiv.style.borderWidth = (this.height <= 0) ? '1px 0px 0px 0px' : '1px 0px 1px 0px';
              } else {
                  // Hides second div and restores style
                  this.div.style.backgroundColor = '';
                  this.div.style.borderWidth = '';
                  this.div.style.borderStyle = '';

                  if (this.secondDiv != null) {
                      this.secondDiv.parentNode.removeChild(this.secondDiv);
                      this.secondDiv = null;
                  }
              }

              me.consume();
          }
      }
  }

  reset() {
      if (this.secondDiv != null) {
          this.secondDiv.parentNode.removeChild(this.secondDiv);
          this.secondDiv = null;
      }

      super.reset(...arguments);
  }
}

export default Rubberband
