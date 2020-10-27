import React from 'react';
import './App.css';
import Frame from './editors/frame';
import AppProvider from './app.provider';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <AppProvider>
          <Frame></Frame>
        </AppProvider>
      </div>
    );
  }
}

export default App;
