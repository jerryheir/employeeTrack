import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Input, Icon } from "native-base";
import { color } from "../Styles/Color";
// import Firebase from './src/Components/Firebase';

export default class InputAtom extends PureComponent {
    state = {
        secureTextEntry: true
    }
    iconFunc = () => {
        if (!this.state.emailType) {
            this.setState({ secureTextEntry: !this.state.secureTextEntry })
        } else {
            this.props.clearText();
        }
    }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Input
        onChangeText={this.props.onChangeText}
        onFocus={this.props.onFocus}
        style={styles.input}
        value={this.props.value}
        secureTextEntry={this.props.secureTextEntry ? this.state.secureTextEntry : false }
        placeholder={this.props.placeholder}
        placeholderTextColor={color.primary}
        maxLength={this.props.maxLength}
        disabled={this.props.disabled ? this.props.disabled : false}
        />
        {
            this.props.icon && 
            <Icon name={
                (this.props.emailType && !this.props.secureTextEntry) ? 'md-close' : 
                (this.props.secureTextEntry && !this.state.secureTextEntry) ? 'md-eye' : 
                (this.props.secureTextEntry && this.state.secureTextEntry) ? 'md-eye-off' :
                 'md-remove'
            }
            style={{ color: color.primary, fontSize: 18 }}
            onPress={this.iconFunc}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60, 
    padding: 5,
    width: '92%',
    alignSelf: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    height: 50,
    width: '92%',
    fontSize: 14,
    alignSelf: 'center',
    color: color.primary
  }
});