import React, {PureComponent} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../Styles/Color';
// import Firebase from './src/Components/Firebase';

export default class MainListAtom extends PureComponent {
  render() {
    return (
      <View style={styles.list}>
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', padding: 8 }}>
            <Text style={styles.name}>{this.props.name}</Text><Text style={styles.code}>{this.props.verifyCode}</Text>
          </View>
          <Text style={styles.role}>{this.props.role}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.time}>{this.props.time}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#FFF'
  },
  name: {
    fontSize: 14,
    color: color.darkGrey
  },
  code: {
    fontSize: 14,
    fontWeight: '500',
    color: color.black,
    paddingLeft: 8
  },
  role: {
    fontSize: 14,
    color: color.primary,
    paddingLeft: 8
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  time: {
    fontSize: 12,
    color: color.darkGrey,
    padding: 8,
    paddingTop: 15,
    textAlign: 'right'
  },
  date: {
    fontSize: 12,
    color: color.darkGrey,
    padding: 8
  }
});