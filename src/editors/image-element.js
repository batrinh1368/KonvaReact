import React from 'react';
import '../App.css';
import AppContext from '../app.context';

class ImageElement extends React.Component {
  state = {
    value: {
      value: '',
    },
    text: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      indexKey: this.props.indexKey,
      text: this.props.value.value || this.props.value.default,
    });
  }

  onUploadImage(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = this.onReadImage.bind(this, reader.result);
  }

  onReadImage(base64) {
    debugger;
  }

  onTextChange(event) {
    this.context.updateItemByIndex(this.state.indexKey, {
      value: event.target.value
    })
  }

  render() {
    return (
      <div className="element-base-info">
        <div className="element-info">
          <label>Image: </label>
          <input
            className="input-control"
            onChange={this.onTextChange.bind(this)}
            value={this.state.text || ''}
          ></input>
        </div>
        <div className="element-attrs"></div>
      </div>
    );
  }
}

ImageElement.contextType = AppContext;

export default ImageElement;
