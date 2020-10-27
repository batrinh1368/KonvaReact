import React from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import AppContext from '../app.context';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: props.designs,
    };
    this.stage = React.createRef();
    this.layer = React.createRef();
    this.wrapperRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    if (this.context.designs) {
      this.context.designs.forEach((element) => {
        this.addItem(element);
      });
    }
    document.addEventListener('mousedown', this.handleClick);
    document.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  addItem(item) {
    console.log(item);
    const layerItem = this._getItemObject(item);
    layerItem.dataItem = item;
    layerItem.on('click', this.itemClick.bind(this));
    layerItem.on('dragend', this.itemDragEnd.bind(this));
    layerItem.on('transformend', this.transformEnd.bind(this));
    layerItem.addEventListener('onModelChange', this.onModelChange.bind(this));
    item.graphicItem = layerItem;
    this.layer.current.add(layerItem);

    this.redraw();
  }

  itemClick(event) {
    console.debug('START itemClick', event);

    this.currentItem = event.target;
    this.disposeTransformer();

    this.layer.current.transformer = this.addTransformer(event.target);
  }

  itemDragEnd(event) {
    console.debug('START itemDragEnd', event);

    this.updateItemData(event.target.dataItem, event.target.getPosition());
    console.debug('STOP itemDragEnd', event.target.dataItem);
  }

  transformEnd(event) {
    console.debug('START transformEnd', event);
    const targetItem = event.target;
    this.updateItemData(targetItem.dataItem, {
      x: targetItem.x(),
      y: targetItem.y(),
      rotation: targetItem.rotation(),
      width: targetItem.width(),
      height: targetItem.height(),
      scaleX: targetItem.scaleX(),
      scaleY: targetItem.scaleY(),
    });

    console.debug('STOP transformEnd', event.target.dataItem);
  }

  updateItemData(dataItem, newValue) {
    // update context data
    this.context.updateValue(dataItem, newValue);

    dataItem = Object.assign(dataItem, newValue);
  }

  onModelChange(eventData) {
    const value = eventData.valueItem.value || eventData.valueItem.default;
    if (eventData.valueItem.type === 'text') {
      eventData.graphicItem.text(value);
    }else if (eventData.valueItem.type === 'image') {
      var imageObj = new Image();
      imageObj.src = value;
      eventData.graphicItem.image(imageObj);
    }
    console.log('onModelChange');
    this.redraw();
  }

  addTransformer(...layerItem) {
    const MIN_WIDTH = 20;
    const tr = new Konva.Transformer({
      nodes: [...layerItem],
      padding: 5,
      // enable only side anchors
      // limit transformer size
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < MIN_WIDTH) {
          return oldBox;
        }
        return newBox;
      },
    });
    this.layer.current.add(tr);
    this.redraw();
    return tr;
  }

  disposeTransformer() {
    if (this.layer.current.transformer) {
      this.layer.current.transformer.destroy();
      this.layer.current.batchDraw();
    }
  }

  redraw() {
    this.layer.current.batchDraw();
  }

  _getItemObject(item, draggable = true) {
    if (item.type === 'rect') {
      return new Konva.Rect({
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        fill: 'red',
        draggable,
      });
    } else if (item.type === 'image') {
      var imageObj = new Image();
      imageObj.src = item.default;
      return new Konva.Image({
        image: imageObj,
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        draggable,
      });
    } else if (item.type === 'textPath') {
      return new Konva.TextPath({
        x: 0,
        y: 0,
        fill: '#333',
        fontSize: 16,
        fontFamily: 'Arial',
        text: item.default,
        data: 'M100,320 C200,200 400,400 500 80',
        draggable,
      });
    } else {
      return new Konva.Text({
        x: 0,
        y: 0,
        text: item.default,
        draggable,
      });
    }
  }

  handleClick(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.disposeTransformer();
    }
  }

  handleKeyboard(event) {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
      this.disposeTransformer();
    } else if (event.keyCode === 46) {
      // DELETE
      this.disposeTransformer();
      if (this.currentItem) {
        this.currentItem.remove();
        this.currentItem = null;
      }
    }
  }

  render() {
    return (
      <div id="preview" ref={this.wrapperRef}>
        <Stage width={600} height={600} ref={this.stage}>
          <Layer key="frame.layer" ref={this.layer}></Layer>
        </Stage>
      </div>
    );
  }
}
Preview.contextType = AppContext;

export default Preview;
