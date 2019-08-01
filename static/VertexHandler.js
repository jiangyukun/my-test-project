import mxGraph4 from 'mxgraph'
let { mxConstants, mxGraph, mxText, mxGraphModel, mxGraphView, mxClient, mxSvgCanvas2D, mxShape, mxUtils, mxEvent
, mxPoint, mxEdgeStyle, mxRectangle, mxEdgeHandler, mxCellRenderer, mxVertexHandler, mxDragSource, mxPopupMenu, mxGuide, mxGraphHandler
, mxConnectionHandler, mxRubberband, mxImage, mxCellHighlight, mxLayoutManager, mxStackLayout, mxCompactTreeLayout, mxHierarchicalLayout, mxEventObject, mxResources
, mxConnector, mxStencil, mxStencilRegistry, mxConstraintHandler, mxEllipse, mxCellState, mxStyleRegistry, mxCodec, mxConnectionConstraint, mxValueChange
, mxDictionary, mxCell, mxGeometry, mxImageExport, mxPopupMenuHandler, mxCellEditor, mxPolyline, mxOutline, mxPanningHandler, mxElbowEdgeHandler
, mxImageShape, mxRectangleShape } = mxGraph4

class VertexHandler extends mxVertexHandler {
  isRecursiveResize(state, me) {
      return !this.graph.isSwimlane(state.cell) && this.graph.model.getChildCount(state.cell) > 0 &&
          !mxEvent.isControlDown(me.getEvent()) && !this.graph.isCellCollapsed(state.cell) &&
          mxUtils.getValue(state.style, 'recursiveResize', '1') == '1' &&
          mxUtils.getValue(state.style, 'childLayout', null) == null;
  }

  isCenteredEvent(state, me) {
      return (!(!this.graph.isSwimlane(state.cell) && this.graph.model.getChildCount(state.cell) > 0 &&
              !this.graph.isCellCollapsed(state.cell) &&
              mxUtils.getValue(state.style, 'recursiveResize', '1') == '1' &&
              mxUtils.getValue(state.style, 'childLayout', null) == null) &&
              mxEvent.isControlDown(me.getEvent())) ||
          mxEvent.isMetaDown(me.getEvent());
  }

  getHandlePadding() {
      var result = new mxPoint(0, 0);
      var tol = this.tolerance;
      
      if (this.graph.cellEditor.getEditingCell() == this.state.cell && 
          this.sizers != null && this.sizers.length > 0 && this.sizers[0] != null)
      {
          tol /= 2;
          
          result.x = this.sizers[0].bounds.width + tol;
          result.y = this.sizers[0].bounds.height + tol;
      }
      else
      {
          result = vertexHandlerGetHandlePadding.apply(this, arguments);
      }
      
      return result;
  }

  updateHint(me) {
      if (this.index != mxEvent.LABEL_HANDLE)
      {
          if (this.hint == null)
          {
              this.hint = createHint();
              this.state.view.graph.container.appendChild(this.hint);
          }

          if (this.index == mxEvent.ROTATION_HANDLE)
          {
              this.hint.innerHTML = this.currentAlpha + '&deg;';
          }
          else
          {
              var s = this.state.view.scale;
              this.hint.innerHTML = this.roundLength(this.bounds.width / s) + ' x ' + this.roundLength(this.bounds.height / s);
          }
          
          var rot = (this.currentAlpha != null) ? this.currentAlpha : this.state.style[mxConstants.STYLE_ROTATION] || '0';
          var bb = mxUtils.getBoundingBox(this.bounds, rot);
          
          if (bb == null)
          {
              bb = this.bounds;
          }
          
          this.hint.style.left = bb.x + Math.round((bb.width - this.hint.clientWidth) / 2) + 'px';
          this.hint.style.top = (bb.y + bb.height + 12) + 'px';
          
          if (this.linkHint != null)
          {
              this.linkHint.style.display = 'none';
          }
      }
  }

  removeHint() {
      mxGraphHandler.prototype.removeHint.apply(this, arguments);
      
      if (this.linkHint != null)
      {
          this.linkHint.style.display = '';
      }
  }

  handleImage = HoverIcons.prototype.mainHandle;
  secondaryHandleImage = HoverIcons.prototype.secondaryHandle;
  rotationEnabled = true;
  manageSizers = true;
  livePreview = true;
  parentHighlightEnabled = true;
  rotationHandleVSpacing = -20;
  tolerance = 12;
  rotationHandleVSpacing = -24;

  isCustomHandleEvent(me) {
      return !mxEvent.isShiftDown(me.getEvent());
  }

  createSizerShape(bounds, index, fillColor) {
      this.handleImage = (index == mxEvent.ROTATION_HANDLE) ? HoverIcons.prototype.rotationHandle : (index == mxEvent.LABEL_HANDLE) ? this.secondaryHandleImage : this.handleImage;
      
      return super.createSizerShape(...arguments);
  }

  getSelectionBounds(state) {
      var model = this.graph.getModel();
      var parent = model.getParent(state.cell);
      var geo = this.graph.getCellGeometry(state.cell);
      
      if (model.isEdge(parent) && geo != null && geo.relative && state.width < 2 && state.height < 2 && state.text != null && state.text.boundingBox != null)
      {
          var bbox = state.text.unrotatedBoundingBox || state.text.boundingBox;
          
          return new mxRectangle(Math.round(bbox.x), Math.round(bbox.y), Math.round(bbox.width), Math.round(bbox.height));
      }
      else
      {
          return super.getSelectionBounds(...arguments);
      }
  }

  mouseDown(sender, me) {
      var model = this.graph.getModel();
      var parent = model.getParent(this.state.cell);
      var geo = this.graph.getCellGeometry(this.state.cell);
      
      // Lets rotation events through
      var handle = this.getHandleForEvent(me);
      
      if (handle == mxEvent.ROTATION_HANDLE || !model.isEdge(parent) || geo == null || !geo.relative ||
          this.state == null || this.state.width >= 2 || this.state.height >= 2)
      {
          super.mouseDown(...arguments);
      }
  }

  isRotationHandleVisible() {
      return this.graph.isEnabled() && this.rotationEnabled && this.graph.isCellRotatable(this.state.cell) &&
          (mxGraphHandler.prototype.maxCells <= 0 || this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells);
  }

  rotateClick() {
      this.state.view.graph.turnShapes([this.state.cell]);
  }

  mouseMove(sender, me) {
      super.mouseMove(...arguments);
      
      if (this.graph.graphHandler.first != null)
      {
          if (this.rotationShape != null && this.rotationShape.node != null)
          {
              this.rotationShape.node.style.display = 'none';
          }
      }
  }

  mouseUp(sender, me) {
      super.mouseUp(...arguments);
      
      // Shows rotation handle only if one vertex is selected
      if (this.rotationShape != null && this.rotationShape.node != null)
      {
          this.rotationShape.node.style.display = (this.graph.getSelectionCount() == 1) ? '' : 'none';
      }
  }

  init() {
      super.init(...arguments);
      var redraw = false;
      
      if (this.rotationShape != null)
      {
          this.rotationShape.node.setAttribute('title', mxResources.get('rotateTooltip'));
      }
      
      var update = () => {
          // Shows rotation handle only if one vertex is selected
          if (this.rotationShape != null && this.rotationShape.node != null)
          {
              this.rotationShape.node.style.display = (this.graph.getSelectionCount() == 1) ? '' : 'none';
          }
          
          if (this.specialHandle != null)
          {
              this.specialHandle.node.style.display = (this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells) ? '' : 'none';
          }
          
          this.redrawHandles();
      };
      
      this.selectionHandler = () => {
          update();
      };
      
      this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionHandler);
      
      this.changeHandler = () => {
          this.updateLinkHint(this.graph.getLinkForCell(this.state.cell),
              this.graph.getLinksForState(this.state));
          update();
      };
      
      this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
      
      // Repaint needed when editing stops and no change event is fired
      this.editingHandler = () => {
          this.redrawHandles();
      };
      
      this.graph.addListener(mxEvent.EDITING_STOPPED, this.editingHandler);

      var link = this.graph.getLinkForCell(this.state.cell);
      var links = this.graph.getLinksForState(this.state);
      this.updateLinkHint(link, links);
      
      if (link != null || (links != null && links.length > 0))
      {
          redraw = true;
      }
      
      if (redraw)
      {
          this.redrawHandles();
      }
  }

  updateLinkHint(link, links) {
      if ((link == null && (links == null || links.length == 0)) ||
          this.graph.getSelectionCount() > 1)
      {
          if (this.linkHint != null)
          {
              this.linkHint.parentNode.removeChild(this.linkHint);
              this.linkHint = null;
          }
      }
      else if (link != null || (links != null && links.length > 0))
      {
          if (this.linkHint == null)
          {
              this.linkHint = createHint();
              this.linkHint.style.padding = '6px 8px 6px 8px';
              this.linkHint.style.opacity = '1';
              this.linkHint.style.filter = '';
              
              this.graph.container.appendChild(this.linkHint);
          }

          this.linkHint.innerHTML = '';
          
          if (link != null)
          {
              this.linkHint.appendChild(this.graph.createLinkForHint(link));
              
              if (this.graph.isEnabled() && typeof this.graph.editLink === 'function')
              {
                  var changeLink = document.createElement('img');
                  changeLink.setAttribute('src', Editor.editImage);
                  changeLink.setAttribute('title', mxResources.get('editLink'));
                  changeLink.setAttribute('width', '11');
                  changeLink.setAttribute('height', '11');
                  changeLink.style.marginLeft = '10px';
                  changeLink.style.marginBottom = '-1px';
                  changeLink.style.cursor = 'pointer';
                  this.linkHint.appendChild(changeLink);
                  
                  mxEvent.addListener(changeLink, 'click', () => {
                      this.graph.setSelectionCell(this.state.cell);
                      this.graph.editLink();
                      mxEvent.consume(evt);
                  });
                  
                  var removeLink = document.createElement('img');
                  removeLink.setAttribute('src', Dialog.prototype.clearImage);
                  removeLink.setAttribute('title', mxResources.get('removeIt', [mxResources.get('link')]));
                  removeLink.setAttribute('width', '13');
                  removeLink.setAttribute('height', '10');
                  removeLink.style.marginLeft = '4px';
                  removeLink.style.marginBottom = '-1px';
                  removeLink.style.cursor = 'pointer';
                  this.linkHint.appendChild(removeLink);
                  
                  mxEvent.addListener(removeLink, 'click', () => {
                      this.graph.setLinkForCell(this.state.cell, null);
                      mxEvent.consume(evt);
                  });
              }
          }

          if (links != null)
          {
              for (var i = 0; i < links.length; i++)
              {
                  var div = document.createElement('div');
                  div.style.marginTop = (link != null || i > 0) ? '6px' : '0px';
                  div.appendChild(this.graph.createLinkForHint(
                      links[i].getAttribute('href'),
                      mxUtils.getTextContent(links[i])));
                  
                  this.linkHint.appendChild(div);
              }
          }
      }
  }

  redrawHandles() {
      vertexHandlerRedrawHandles.apply(this);

      if (this.state != null && this.linkHint != null)
      {
          var c = new mxPoint(this.state.getCenterX(), this.state.getCenterY());
          var tmp = new mxRectangle(this.state.x, this.state.y - 22, this.state.width + 24, this.state.height + 22);
          var bb = mxUtils.getBoundingBox(tmp, this.state.style[mxConstants.STYLE_ROTATION] || '0', c);
          var rs = (bb != null) ? mxUtils.getBoundingBox(this.state,
              this.state.style[mxConstants.STYLE_ROTATION] || '0') : this.state;
          var tb = (this.state.text != null) ? this.state.text.boundingBox : null;
          
          if (bb == null)
          {
              bb = this.state;
          }
          
          var b = bb.y + bb.height;
          
          if (tb != null)
          {
              b = Math.max(b, tb.y + tb.height);
          }
          
          this.linkHint.style.left = Math.max(0, Math.round(rs.x + (rs.width - this.linkHint.clientWidth) / 2)) + 'px';
          this.linkHint.style.top = Math.round(b + this.verticalOffset / 2 + 6 +
              this.state.view.graph.tolerance) + 'px';
      }
  }

  reset() {
      super.reset(...arguments);
      
      // Shows rotation handle only if one vertex is selected
      if (this.rotationShape != null && this.rotationShape.node != null)
      {
          this.rotationShape.node.style.display = (this.graph.getSelectionCount() == 1) ? '' : 'none';
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
      
      if  (this.editingHandler != null)
      {
          this.graph.removeListener(this.editingHandler);
          this.editingHandler = null;
      }
  }
}

export default VertexHandler
