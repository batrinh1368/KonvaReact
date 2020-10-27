import React from 'react';
import '../App.css';
import AppContext from '../app.context';

class TextElement extends React.Component {
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

  onTextChange(event) {
    this.context.updateItemByIndex(this.state.indexKey, {
      value: event.target.value
    })
  }

  render() {
    return (
      <div className="element-items">
        <input
          className="input-control"
          onChange={this.onTextChange.bind(this)}
          value={this.state.value.value || this.state.value.default}
        ></input>
      </div>
    );
  }
}

TextElement.contextType = AppContext;

export default TextElement;
