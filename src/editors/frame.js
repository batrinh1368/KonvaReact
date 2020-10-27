import React from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';

export default class Frame extends React.Component {
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
    if (this.state.designs) {
      this.state.designs.forEach((element) => {
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
    const layerItem = this._getItemObject(item);
    layerItem.on('click', this.itemClick.bind(this));
    this.layer.current.add(layerItem);

    this.redraw();
  }

  itemClick(event) {
    this.currentItem = event.target;
    this.disposeTransformer();

    this.layer.current.transformer = this.addTransformer(event.target);
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
      imageObj.src =
        'https://www.lemark.co.uk/wp-content/uploads/Your-Image-Here-1.jpg';
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
        y: 50,
        fill: '#333',
        fontSize: 16,
        fontFamily: 'Arial',
        text:
          "All the world's a stage, and all the men and women merely players.",
        data: 'M100,320 C200,200 400,400 500 80',
        draggable,
      });
    } else {
      return new Konva.Text({
        x: 0,
        y: 0,
        text: 'Simple Text',
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
