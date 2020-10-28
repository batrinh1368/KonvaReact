import React from 'react';
import AppContext from './app.context';

export default class AppProvider extends React.Component {
  DEFAULT_TEXT = 'This is my text.';
  DEFAULT_IMAGE_SRC =
    'https://www.lemark.co.uk/wp-content/uploads/Your-Image-Here-1.jpg';

  state = {
    designs: [
      { type: 'text', default: this.DEFAULT_TEXT },
      {
        type: 'image',
        default: this.DEFAULT_IMAGE_SRC,
      },
    ]
  };

  _addItem(item) {
    const designs = this.state.designs;
    designs.push(item);
    this._updateState(designs);
  }

  _updateItem(index, value, fireModelChangeEvent = false) {
    if (this.state.designs[index]) {
      const item = this.state.designs[index];
      const newValue = Object.assign(item, value);

      if (fireModelChangeEvent && item.graphicItem) {
        item.graphicItem.dispatchEvent({
          type: 'onModelChange',
          valueItem: newValue,
          valueIndex: index,
          graphicItem: item.graphicItem,
        });
      }
      this.state.designs[index] = newValue;
      const designs = this.state.designs;

      this._updateState(designs);
    }
  }

  _updateState(designs) {
    this.setState({
      designs,
    });
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          designs: this.state.designs,
          addImage: (src = '') => {
            this._addItem({
              type: 'image',
              default: src || this.DEFAULT_IMAGE_SRC,
            });
          },
          addText: (text = '') => {
            this._addItem({
              type: 'text',
              default: text || this.DEFAULT_TEXT,
            });
          },
          addTextPath: (text = '') => {
            this._addItem({
              type: 'textPath',
              default: text || this.DEFAULT_TEXT,
            });
          },
          updateItem: (item, value) => {
            if (this.state.designs.includes(item)) {
              const objectIndex = this.state.designs.indexOf(item);
              this._updateItem(objectIndex, value, true);
            }
          },
          updateValue: (item, value) => {
            if (this.state.designs.includes(item)) {
              const objectIndex = this.state.designs.indexOf(item);
              this._updateItem(objectIndex, value);
            }
          },
          updateItemByIndex: (index, value) => {
            if (this.state.designs[index]) {
              this._updateItem(index, value, true);
            }
          },
          updateFont: (index, value) => {
              console.log(this.state.designs[index]);
              if (this.state.designs[index] && this.state.designs[index].type === 'text') {
                  let item = this.state.designs[index];
                  this.state.designs[index] = Object.assign(item, value);

                  item.graphicItem.dispatchEvent({
                      type: 'onModelChange',
                      valueItem: Object.assign(item, value),
                      valueIndex: index,
                      graphicItem: item.graphicItem,
                  });

                  const designs = this.state.designs;
                  this.setState({
                      designs,
                  });
              }
          },
          addItem: (item) => {
            this._addItem(item);
          },
          updateDesignState: (designs) => {
            this._updateState(designs);
          },
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
