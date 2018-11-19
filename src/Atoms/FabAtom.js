import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { color } from '../Styles/Color';
// import Firebase from './src/Components/Firebase';

export default class FabAtom extends PureComponent {
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} style={styles.fab} onPress={this.props.onPress} activeOpacity={.5}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    position: 'absolute',
    bottom: 60,
    right: 20,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.5,
    shadowOffset: { width: 0, height: 1.5 },
    elevation: 3
  },
  plus: {
    fontSize: 40,
    color: color.darkGrey
  }
});
