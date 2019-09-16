import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class EdgeHandler extends mxEdgeHandler {
  snapToTerminals = true;

  updateHint(me, point) {
      if (this.hint == null)
      {
          this.hint = createHint();
          this.state.view.graph.container.appendChild(this.hint);
      }

      var t = this.graph.view.translate;
      var s = this.graph.view.scale;
      var x = this.roundLength(point.x / s - t.x);
      var y = this.roundLength(point.y / s - t.y);
      
      this.hint.innerHTML = x + ', ' + y;
      this.hint.style.visibility = 'visible';
      
      if (this.isSource || this.isTarget)
      {
          if (this.constraintHandler.currentConstraint != null &&
              this.constraintHandler.currentFocus != null)
          {
              var pt = this.constraintHandler.currentConstraint.point;
              this.hint.innerHTML = '[' + Math.round(pt.x * 100) + '%, '+ Math.round(pt.y * 100) + '%]';
          }
          else if (this.marker.hasValidState())
          {
              this.hint.style.visibility = 'hidden';
          }
      }
      
      this.hint.style.left = Math.round(me.getGraphX() - this.hint.clientWidth / 2) + 'px';
      this.hint.style.top = (Math.max(me.getGraphY(), point.y) + this.state.view.graph.gridSize) + 'px';
      
      if (this.linkHint != null)
      {
          this.linkHint.style.display = 'none';
      }
  }

  removeHint = mxVertexHandler.prototype.removeHint;
  handleImage = HoverIcons.prototype.mainHandle;
  terminalHandleImage = HoverIcons.prototype.terminalHandle;
  fixedHandleImage = HoverIcons.prototype.fixedHandle;
  labelHandleImage = HoverIcons.prototype.secondaryHandle;
  parentHighlightEnabled = true;
  dblClickRemoveEnabled = true;
  straightRemoveEnabled = true;
  virtualBendsEnabled = true;
  mergeRemoveEnabled = true;
  manageLabelHandle = true;
  outlineConnect = true;

  isAddVirtualBendEvent(me) {
      return !mxEvent.isShiftDown(me.getEvent());
  }

  isCustomHandleEvent(me) {
      return !mxEvent.isShiftDown(me.getEvent());
  }

  tolerance = 12;

  updatePreviewState(edge, point, terminalState, me) {
      super.updatePreviewState(...arguments);
      
      if (terminalState != this.currentTerminalState)
      {
          startTime = new Date().getTime();
          timeOnTarget = 0;
      }
      else
      {
          timeOnTarget = new Date().getTime() - startTime;
      }
      
      this.currentTerminalState = terminalState;
  }

  isOutlineConnectEvent(me) {
      return (this.currentTerminalState != null && me.getState() == this.currentTerminalState && timeOnTarget > 2000) ||
          ((this.currentTerminalState == null || mxUtils.getValue(this.currentTerminalState.style, 'outlineConnect', '1') != '0') &&
          super.isOutlineConnectEvent(...arguments));
  }

  createHandleShape(index, virtual) {
      var source = index != null && index == 0;
      var terminalState = this.state.getVisibleTerminalState(source);
      var c = (index != null && (index == 0 || index >= this.state.absolutePoints.length - 1 ||
          (this.constructor == mxElbowEdgeHandler && index == 2))) ?
          this.graph.getConnectionConstraint(this.state, terminalState, source) : null;
      var pt = (c != null) ? this.graph.getConnectionPoint(this.state.getVisibleTerminalState(source), c) : null;
      var img = (pt != null) ? this.fixedHandleImage : ((c != null && terminalState != null) ?
          this.terminalHandleImage : this.handleImage);
      
      if (img != null)
      {
          var shape = new mxImageShape(new mxRectangle(0, 0, img.width, img.height), img.src);
          
          // Allows HTML rendering of the images
          shape.preserveImageAspect = false;

          return shape;
      }
      else
      {
          var s = mxConstants.HANDLE_SIZE;
          
          if (this.preferHtml)
          {
              s -= 1;
          }
          
          return new mxRectangleShape(new mxRectangle(0, 0, s, s), mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR);
      }
  }

  updateLinkHint = mxVertexHandler.prototype.updateLinkHint;

  init() {
      super.init(...arguments);
      
      // Disables connection points
      this.constraintHandler.isEnabled = () => {
          return this.state.view.graph.connectionHandler.isEnabled();
      };
      
      var update = () => {
          if (this.linkHint != null)
          {
              this.linkHint.style.display = (this.graph.getSelectionCount() == 1) ? '' : 'none';
          }
          
          if (this.labelShape != null)
          {
              this.labelShape.node.style.display = (this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells) ? '' : 'none';
          }
      };

      this.selectionHandler = (sender, evt) => {
          update();
      };
      
      this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionHandler);
      
      this.changeHandler = (sender, evt) => {
          this.updateLinkHint(this.graph.getLinkForCell(this.state.cell),
              this.graph.getLinksForState(this.state));
          update();
          this.redrawHandles();
      };
      
      this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);

      var link = this.graph.getLinkForCell(this.state.cell);
      var links = this.graph.getLinksForState(this.state);
                              
      if (link != null || (links != null && links.length > 0))
      {
          this.updateLinkHint(link, links);
          this.redrawHandles();
      }
  }

  redrawHandles() {
      // Workaround for special case where handler
      // is reset before this which leads to a NPE
      if (this.marker != null)
      {
          edgeHandlerRedrawHandles.apply(this);
  
          if (this.state != null && this.linkHint != null)
          {
              var b = this.state;
              
              if (this.state.text != null && this.state.text.bounds != null)
              {
                  b = new mxRectangle(b.x, b.y, b.width, b.height);
                  b.add(this.state.text.bounds);
              }
              
              this.linkHint.style.left = Math.max(0, Math.round(b.x + (b.width - this.linkHint.clientWidth) / 2)) + 'px';
              this.linkHint.style.top = Math.round(b.y + b.height + 6 + this.state.view.graph.tolerance) + 'px';
          }
      }
  }

  reset() {
      super.reset(...arguments);
      
      if (this.linkHint != null)
      {
          this.linkHint.style.visibility = '';
      }
  }

  destroy() {
      super.destroy(...arguments);
      
      if (this.linkHint != null)
      {
          this.linkHint.parentNode.removeChild(this.linkHint);
          this.linkHint = null;
      }

      if (this.selectionHandler != null)
      {
          this.graph.getSelectionModel().removeListener(this.selectionHandler);
          this.selectionHandler = null;
      }

      if  (this.changeHandler != null)
      {
          this.graph.getModel().removeListener(this.changeHandler);
          this.changeHandler = null;
      }
  }
}

export default EdgeHandler
