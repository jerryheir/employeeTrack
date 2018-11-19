import React, {PureComponent} from 'react';
import { Platform, StyleSheet, Text, View, AlertIOS } from 'react-native';
import moment from 'moment';
import PickerAtom from "./PickerAtom";
import { color } from '../Styles/Color';
import * as firebase from 'firebase';
// import Firebase from './src/Components/Firebase';

const day = moment().format('L');
const format = day.replace('/', '-');
const dayFormat = format.replace('/', '-');
console.log(dayFormat);
const stringDay = moment().format('LL'); 
console.log(stringDay);
const time = moment().format('LT');
console.log(time);
// moment().format('LT');  // 11:20 AM

export default class HeaderAtom extends PureComponent {
    componentDidMount(){
           /*const config = {
                apiKey: "AIzaSyBK-AEv7TcMjKVhM6WZltuwXShy0QCia1M",
                authDomain: "employee-track-69a0b.firebaseapp.com",
                databaseURL: "https://employee-track-69a0b.firebaseio.com",
                projectId: "employee-track-69a0b",
                storageBucket: "employee-track-69a0b.appspot.com",
                messagingSenderId: "798802728250"
            };
            firebase.initializeApp(config);*/
    }
    state = {
        data: ['Empty'],
        selectedValue: ''
    }
    onValueChange = (selectedValue, cool)=>{
        this.setState({ selectedValue });
        console.log('Fetch Value Function Ran!!!');
        firebase.database().ref('attendance/').once('value', (data) => {
            // console.log(data); // select database once and never runs again...
            // this.setState({ data: data });
            console.log('Fetch Value Function Ran!!!');
        })
    }
  render() {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.e}>e</Text><Text style={styles.besideE}>-track</Text>
                </View>
                <PickerAtom 
                list={['11-13-2018', dayFormat]}
                onValueChange={this.onValueChange}
                selectedValue={this.state.selectedValue}
                viewStyle={{ padding: 10, width: '50%' }}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    paddingTop: 30
    //justifyContent: 'center'
  },
  header: {
    height: 90,
    width: '100%',
    backgroundColor: color.white,
    borderBottomColor: color.darkGrey,
    borderBottomWidth: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  e: {
    color: color.primary,
    fontSize: 50,
    fontWeight: 'bold'
  },
  besideE: {
    color: color.primary,
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 10
  }
});