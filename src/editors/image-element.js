import React from 'react';
import '../App.css';

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

  render() {
    return (
      <div className="element-items">
        <input
          type="file"
          className="input-control"
          onChange={this.onUploadImage.bind(this)}
        ></input>
        <label>{this.state.value.value || this.state.value.default}</label>
      </div>
    );
  }
}

export default ImageElement;
