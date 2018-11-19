import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
// import SignUp from './src/Components/SignUp';
import HeaderAtom from "./src/Atoms/HeaderAtom";
import MainListAtom from './src/Atoms/MainListAtom';
import FabAtom from './src/Atoms/FabAtom';
import MainList from './src/Components/MainList';
import AddNewRecord from './src/Components/AddNewRecord';
import RouteStack from './src/Navigation/Routes';
// import Login from './src/Components/Login';
// import Firebase from './src/Components/Firebase';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  "Remote",
  "Warning: Can't call setState",
  "Setting a timer for a long period",

]);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RouteStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
