import React from 'react';
import '../App.css';
import AppContext from '../app.context';
import ImageElement from './image-element';
import TextElement from './text-element';

class PanelInfoItem extends React.Component {
  state = {
    item: {},
    index: 0,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      item: this.props.item,
      index: this.props.index,
    });
  }

  render() {
    let itemTemplate;
    const item = this.state.item;
    const index = this.state.index;
    if (item.type === 'image') {
      itemTemplate = (
        <ImageElement key={index} indexKey={index} value={item}></ImageElement>
      );
    } else if (item.type === 'text') {
      itemTemplate = (
        <TextElement key={index} indexKey={index} value={item}></TextElement>
      );
    } else {
      itemTemplate = item.default;
    }

    return <div className="element-base-info">{itemTemplate}</div>;
  }
}

PanelInfoItem.contextType = AppContext;

export default PanelInfoItem;
