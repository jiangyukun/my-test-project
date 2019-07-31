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
import mxConnector from 'mxgraph'
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

class mxEdgeHandler {
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
      mxEdgeHandlerUpdatePreviewState.apply(this, arguments);
      
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
          mxEdgeHandlerIsOutlineConnectEvent.apply(this, arguments));
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
      edgeHandlerInit.apply(this, arguments);
      
      // Disables connection points
      this.constraintHandler.isEnabled = mxUtils.bind(this, function()
      {
          return this.state.view.graph.connectionHandler.isEnabled();
      });
      
      var update = mxUtils.bind(this, function()
      {
          if (this.linkHint != null)
          {
              this.linkHint.style.display = (this.graph.getSelectionCount() == 1) ? '' : 'none';
          }
          
          if (this.labelShape != null)
          {
              this.labelShape.node.style.display = (this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells) ? '' : 'none';
          }
      });

      this.selectionHandler = mxUtils.bind(this, function(sender, evt)
      {
          update();
      });
      
      this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionHandler);
      
      this.changeHandler = mxUtils.bind(this, function(sender, evt)
      {
          this.updateLinkHint(this.graph.getLinkForCell(this.state.cell),
              this.graph.getLinksForState(this.state));
          update();
          this.redrawHandles();
      });
      
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
      edgeHandlerReset.apply(this, arguments);
      
      if (this.linkHint != null)
      {
          this.linkHint.style.visibility = '';
      }
  }

  destroy() {
      edgeHandlerDestroy.apply(this, arguments);
      
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

export default mxEdgeHandler
