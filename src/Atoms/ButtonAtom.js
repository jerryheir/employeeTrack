import React, {PureComponent} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { color } from '../Styles/Color';
// import Firebase from './src/Components/Firebase';

export default class ButtonAtom extends PureComponent {
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={this.props.disabled ? [styles.greyContainer, this.props.style] : [styles.container, this.props.style]}>
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 8,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 10
  },
  text: {
    fontSize: 16
  },
  greyContainer: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 8,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 10
  }
});