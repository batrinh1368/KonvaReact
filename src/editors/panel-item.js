import React from 'react';
import '../App.css';
import AppContext from '../app.context';
import PanelInfoItem from './panel-info-item';

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

    return (
        <div className="element-items">
          <PanelInfoItem item={item} key={index}></PanelInfoItem>
          <div className="element-options">
              <button className="btn-sort">Sort</button>
          </div>
        </div>
    );
  }
}

PanelItem.contextType = AppContext;

export default PanelItem;
