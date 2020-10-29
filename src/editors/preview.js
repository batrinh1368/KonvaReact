import React from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import AppContext from '../app.context';
import DesignConst from './design-const';

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
    this._getItemObject(item).then((layerItem) => {
      layerItem.dataItem = item;
      layerItem.on('click', this.itemClick.bind(this));
      layerItem.on('dragend', this.itemDragEnd.bind(this));
      layerItem.on('transformend', this.transformEnd.bind(this));
      layerItem.addEventListener(
        'onModelChange',
        this.onModelChange.bind(this)
      );
      item.graphicItem = layerItem;
      this.layer.current.add(layerItem);

      this.redraw();
    });
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
    const dataItem = eventData.valueItem;
    const graphicItem = eventData.graphicItem;
    const value = dataItem.value || dataItem.default;
    if (dataItem.type === 'text' || dataItem.type === 'textPath') {
      this.loadCustomFont(dataItem.fontFamily, dataItem.linkFont).then(
        (fontFamily) => {
          graphicItem.text(value);
          graphicItem.fill(dataItem.color);
          graphicItem.fontSize(dataItem.fontSize);
          graphicItem.fontFamily(fontFamily);
        }
      );
    } else if (eventData.valueItem.type === 'image') {
      const imageObj = new Image();
      imageObj.src = value;
      imageObj.onload = this.redraw.bind(this);
      graphicItem.image(imageObj);
    }
    // eventData.graphicItem = this._getItemObject(eventData.valueItem)
    console.log('onModelChange');

    this.redraw();
  }

  loadCustomFont(fontFamily, linkFont) {
    if (!linkFont) {
      return Promise.resolve(fontFamily);
    }
    if (document.fonts.check('1px ' + fontFamily)) {
      return Promise.resolve(fontFamily);
    }
    return new Promise((resolve, reject) => {
      const customFont = new FontFace(fontFamily, `url(${linkFont})`);
      customFont
        .load()
        .then((loaded_face) => {
          document.fonts.add(loaded_face);
          resolve(fontFamily);
        })
        .catch((error) => {
          console.error(error);
          reject(`Cann't found the font`);
        });
    });
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

  redrawAll(designs) {
    this.layer.current.clear();
    this.layer.current.destroyChildren();
    designs.forEach((item) => {
      this.addItem(item);
    });
  }

  _getTransformData(item) {
    return Object.assign(DesignConst.DEFAULT_TRANSFORM, {
      x: item.x,
      y: item.y,
      rotation: item.rotation,
      scaleX: item.scaleX,
      scaleY: item.scaleY,
      skewX: item.skewX,
    });
  }
  _getItemObject(item, draggable = true) {
    return new Promise((resolve) => {
      if (item.type === 'image') {
        const transformData = this._getTransformData(item);
        const imageObj = new Image();
        imageObj.src = item.value || item.default;
        imageObj.onload = this.redraw.bind(this);
        return resolve(
          new Konva.Image({
            image: imageObj,
            width: item.width || 200,
            height: item.height || 200,
            ...transformData,
            draggable,
          })
        );
      } else if (item.type === 'text' || item.type === 'textPath') {
        this.loadCustomFont(item.fontFamily, item.linkFont).then(
          (fontFamily) => {
            const transformData = this._getTransformData(item);
            if (item.type === 'textPath') {
              resolve(
                new Konva.TextPath({
                  fill: '#333',
                  fontSize: 16,
                  fontFamily: fontFamily,
                  text: item.value || item.default,
                  data: 'M100,320 C200,200 400,400 500 80',
                  ...transformData,
                  draggable,
                })
              );
            } else {
              resolve(
                new Konva.Text({
                  text: item.value || item.default,
                  fontSize: item.fontSize || 12,
                  fill: item.color || '#000000',
                  fontFamily: fontFamily,
                  ...transformData,
                  draggable,
                })
              );
            }
          }
        );
      }
    });
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
