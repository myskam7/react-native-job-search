import React from 'react';
import store from './store/index'
import { Provider } from 'react-redux';

import Nav from "./Navigator";

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <Nav />
        </Provider>
    );
  }
}


