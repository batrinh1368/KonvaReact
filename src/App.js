import React from "react";
import './App.css';
import Frame from './editors/frame';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {designs: [
      {
        type: "text",
      },
      {
        type: "image",
      },
    ]}
    this.preview = React.createRef();
  }

  addText() {
    console.log("addText.");
    this.state.designs.push({
      type: "text",
    });
    this._updatePreview()
  }

  addTextPath() {
    console.log("addTextPath.");
    this.state.designs.push({
      type: "textPath",
    });
    this._updatePreview()
  }

  addImage() {
    console.log("addImage.");
    this.state.designs.push({
      type: "image",
    });
    this._updatePreview()
  }

  addRect() {
    console.log("addRect.");
    this.state.designs.push({
      type: "rect",
    });
    this._updatePreview()
  }

  _updatePreview(){
    this.preview.current.addItem(this.state.designs[this.state.designs.length - 1])
  }

  render() {
    return (
      <div className="App">
        <Frame designs={this.state.designs} ref={this.preview} key="frame.app"></Frame>
        <div>
          <button onClick={() => this.addText()}>Add Text</button>
          <button onClick={() => this.addTextPath()}>Add Text Path</button>
          <button onClick={() => this.addImage()}>Add Image</button>
          <button onClick={() => this.addRect()}>Add Rect</button>
        </div>
      </div>
    );
  }
}