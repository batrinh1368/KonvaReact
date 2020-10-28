import React from 'react';
import '../App.css';
import AppContext from '../app.context';

class ImageElement extends React.Component {
  state = {
    value: {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      indexKey: this.props.indexKey,
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
      <div className="element-items">
        <input
          type="text"
          className="input-control"
          onChange={this.onTextChange.bind(this)}
          value={this.state.value.value || this.state.value.default || ''}
        ></input>
      </div>
    );
  }
}

ImageElement.contextType = AppContext;

export default ImageElement;
