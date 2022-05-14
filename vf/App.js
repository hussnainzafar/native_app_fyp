import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import AppContainer from './app/AppContainer';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';




class App extends Component {
  render() {
    console.disableYellowBox = true;

    return (
      <>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" />
          <AppContainer />
        </Provider>
      </>
    );
  };
}



export default App;
