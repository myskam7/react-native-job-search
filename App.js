import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator} from 'react-navigation';


import Nav from "./Navigator";

export default class App extends React.Component {
  render() {
    return (
        <Nav/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

