import React from 'react';
import '../App.css';
import AppContext from '../app.context';
import ImageElement from './image-element';
import TextElement from './text-element';

class PanelItem extends React.Component {
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
    const item = this.state.item;
    const index = this.state.index;
    let itemTemplate;
    if (item.type === 'image') {
      itemTemplate = (
        <ImageElement key={index} indexKey={index} value={item}></ImageElement>
      );
    } else if (item.type === 'text') {
      itemTemplate = (
        <TextElement key={index} indexKey={index} value={item}></TextElement>
      );
    } else {
      itemTemplate = (
        <TextElement key={index} indexKey={index} value={item}></TextElement>
      );
    }

    return (
      <div className="element-items" draggable>
        {itemTemplate}
        <div className="element-options">
          <button className="btn-sort">Sort</button>
        </div>
      </div>
    );
  }
}

PanelItem.contextType = AppContext;

export default PanelItem;
