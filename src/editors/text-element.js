import React from 'react';
import '../App.css';
import AppContext from '../app.context';

class TextElement extends React.Component {
  state = {
    value: {
      value: '',
    },
    text: '',
    color: '#fff',
    fontSize: 14,
  };

  constructor(props) {
    super(props);
    this.onFontChange = this.onFontChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      text: this.props.value.value || this.props.value.default,
      indexKey: this.props.indexKey,
    });
  }

  onTextChange(event) {
    this.context.updateItemByIndex(this.state.indexKey, {
      value: {
        text: event.target.value
      },
    });
  }

  onFontChange(event) {
    this.context.updateFont(0, {
      value: {
        text: 'afsafasfasf',
        fontFamily: event.target.value
      }
    });
  }

  onFontSizeChange(event) {

  }

  onColorChange() {}

  render() {
    return (
      <div className="element-base-info">
        <div className="element-info">
          <label>Text: </label>
          <input
            className="input-control"
            onChange={this.onTextChange.bind(this)}
            value={this.state.text || ''}
          />
        </div>
        <div className="element-attrs">
          Font:{' '}
          <select onChange={this.onFontChange}>
            <option value="arial">Arial</option>
            <option value="tahoma">Tahoma</option>
            <option
              value="custom"
            >
              Raconteur
            </option>
          </select>
          Size:{' '}
          <input
            className="font-size"
            width={30}
            value={this.state.fontSize || ''}
            onChange={this.onFontSizeChange}
          ></input>
          px Color:{' '}
          <input
            className="font-color"
            width={30}
            type="color"
            value={this.state.color || ''}
            onChange={this.onColorChange}
          ></input>
          <span>{this.state.color}</span>
        </div>
      </div>
    );
  }
}

TextElement.contextType = AppContext;

export default TextElement;
