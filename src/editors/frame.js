import React from 'react';
import '../App.css';
import Preview from './preview';
import AppContext from '../app.context';
import ImageElement from './image-element';
import TextElement from './text-element';
import PanelItem from './panel-item';
import DragSortableList from 'react-drag-sortable';

class Frame extends React.Component {
  constructor(props) {
    super(props);

    this.preview = React.createRef();
  }

  componentDidMount() {}

  addText() {
    console.log('addText.');
    this.context.addText();
    this._updatePreview();
  }

  addTextPath() {
    console.log('addTextPath.');
    this.context.addTextPath();
    this._updatePreview();
  }

  addImage() {
    console.log('addImage.');
    this.context.addImage();
    this._updatePreview();
  }

  addRect() {
    console.log('addRect.');
    this.context.addImage();
    this._updatePreview();
  }

  _addItem(type = 'text') {
    const item = { type: type };
    this.context.addItem(item);
    this._updatePreview();
  }

  _updatePreview() {
    const indexItem = this.context.designs.length - 1;
    const item = this.context.designs[indexItem];
    this.preview.current.addItem(item);
  }

  render() {
    // const listDrag = [];
    // this.context.designs.forEach((item, index) => {
    //   listDrag.push({
    //     content: <PanelItem item={item} key={index}></PanelItem>,
    //     item: item,
    //   });
    // });
    // this.context.designs.forEach((item, index) => {
    //   let element;
    //   if (item.type === 'image') {
    //     element = (
    //       <ImageElement
    //         key={index}
    //         indexKey={index}
    //         value={item}
    //       ></ImageElement>
    //     );
    //   } else if (item.type === 'text') {
    //     element = (
    //       <TextElement key={index} indexKey={index} value={item}></TextElement>
    //     );
    //   } else {
    //     element = <div key={index}>{item.default}</div>;
    //   }

    //   listDrag.push({
    //     content: element,
    //     item: item,
    //   });
    // });
    return (
      <div id="editor" className="d-flex-center">
        <div className="col panel">
          <div className="list-element">
            {/* {this.context.designs.map((item, index) => {
              if (item.type === 'image') {
                return (
                  <ImageElement
                    key={index}
                    indexKey={index}
                    value={item}
                  ></ImageElement>
                );
              } else if (item.type === 'text') {
                return (
                  <TextElement
                    key={index}
                    indexKey={index}
                    value={item}
                  ></TextElement>
                );
              } else {
                return <div key={index}>{item.default}</div>;
              }
            })} */}
            {this.context.designs.map((item, index) => {
              return (
                <PanelItem item={item} key={index} index={index}></PanelItem>
              );
            })}
            {/* <DragSortableList
              ref={this.dragList}
              items={listDrag}
              onSort={(sortedList, dropEvent) =>
                this.onSort(sortedList, dropEvent)
              }
              type="vertical"
            /> */}
          </div>
          <div className="panel-button">
            <button onClick={() => this.addText()}>Add Text</button>
            <button onClick={() => this.addTextPath()}>Add Text Path</button>
            <button onClick={() => this.addImage()}>Add Image</button>
            <button onClick={() => this.addRect()}>Add Rect</button>
          </div>
        </div>
        <div className="col">
          <Preview ref={this.preview} key="frame.app"></Preview>
        </div>
        <div id="info" className="col">
          <pre>{JSON.stringify(this.context.designs)}</pre>
        </div>
      </div>
    );
  }
}
Frame.contextType = AppContext;

export default Frame;
