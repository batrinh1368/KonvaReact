import React from 'react';
import '../App.css';
import AppContext from '../app.context';

class TextElement extends React.Component {
  state = {
    value: {
      value: '',
      color: '#fff',
      fontSize: 14,
    },
    text: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      text: this.props.value.value || this.props.value.default,
      indexKey: this.props.indexKey,
    });
  }

  onTextChange(event) {
    this._updateConfig({
      value: event.target.value,
    });
  }

  onFontChange(event) {
    this._updateConfig({
      fontFamily: event.target.value,
    });
  }

  onFontSizeChange(event) {
    this._updateConfig({
      fontSize: event.target.value,
    });
  }

  onColorChange(event) {
    this._updateConfig({
      color: event.target.value,
    });
  }

  _updateConfig(config) {
    this.context.updateItemByIndex(
      this.state.indexKey,
      Object.assign(
        {
          fontSize: this.state.value.fontSize || 12,
          color: this.state.value.color || '#000000',
          fontFamily: this.state.value.fontFamily || 'Arial',
        },
        config
      )
    );
  }

  render() {
    return (
      <div className="element-base-info">
        <div className="element-info">
          <label>Text: </label>
          <input
            className="input-control"
            onChange={this.onTextChange.bind(this)}
            value={this.props.value.value || this.props.value.default || ''}
          />
        </div>
        <div className="element-attrs">
          Font:{' '}
          <select onChange={this.onFontChange.bind(this)}>
            <option value="arial">Arial</option>
            <option value="tahoma">Tahoma</option>
            <option
              value="raconteur"
              linkfont="https://get.fontspace.co/webfont/LOlE/NjUxNzI0MGJjMDVlNDI0NzhhOTIyZDk5MDhhYTI4ZjUudHRm/raconteur-nf.woff"
            >
              Raconteur
            </option>
          </select>
          Size:{' '}
          <input
            type="number"
            className="font-size"
            width={30}
            value={this.props.value.fontSize || 12}
            onChange={this.onFontSizeChange.bind(this)}
          ></input>
          px Color:{' '}
          <input
            className="font-color"
            width={30}
            type="color"
            value={this.props.value.color || '#000000'}
            onChange={this.onColorChange.bind(this)}
          ></input>
          <span>{this.props.value.color}</span>
        </div>
      </div>
    );
  }
}

TextElement.contextType = AppContext;

export default TextElement;
