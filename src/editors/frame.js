import React from 'react';
import '../App.css';
import Preview from './preview';
import AppContext from '../app.context';
import PanelItem from './panel-item';
import DragSortableList from 'react-drag-sortable';

class Frame extends React.Component {
  constructor(props) {
    super(props);

    this.preview = React.createRef();
    this.dragList = React.createRef();
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

  onSort(sortedList, dropEvent) {
    console.log('sortedList', sortedList);
    const elementItems = [];
    sortedList.forEach((value) => {
      elementItems.push(value.item);
    });

    this.context.updateDesignState(elementItems);
  }

  render() {
    const listDrag = [];

    this.context.designs.forEach((item, index) => {
      listDrag.push({
        content: <PanelItem item={item} key={index}></PanelItem>,
        item: item,
      });
    });

    return (
      <div id="editor" className="d-flex-center">
        <div className="col panel">
          <div className="list-element">
            <DragSortableList
              ref={this.dragList}
              items={listDrag}
              onSort={(sortedList, dropEvent) =>
                this.onSort(sortedList, dropEvent)
              }
              type="vertical"
            />
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
