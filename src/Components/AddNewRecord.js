import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert } from 'react-native';
import moment from "moment";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import { color } from '../Styles/Color';
import * as firebase from 'firebase';
import { Icon } from 'native-base';
// import Firebase from './src/Components/Firebase';

const day = moment().format('L');
const format = day.replace('/', '-');
const dayFormat = format.replace('/', '-');
const stringDay = moment().format('LL'); 
const time = moment().format('LT');

const noSubmit = (moment().format('dddd') == "Saturday" || moment().format('dddd') == "Sunday") ? true : false

class AddNewRecord extends Component {
  async componentDidMount(){
    /*const config = {
      apiKey: "AIzaSyBK-AEv7TcMjKVhM6WZltuwXShy0QCia1M",
      authDomain: "employee-track-69a0b.firebaseapp.com",
      databaseURL: "https://employee-track-69a0b.firebaseio.com",
      projectId: "employee-track-69a0b",
      storageBucket: "employee-track-69a0b.appspot.com",
      messagingSenderId: "798802728250"
    };
    firebase.initializeApp(config);*/
    const role = await this.props.navigation.getParam('role', 'No company role');
    const firstname = await this.props.navigation.getParam('firstname', 'No First Name');
    const lastname = await this.props.navigation.getParam('lastname', 'No Last Name');
    this.setState({ noSubmit: noSubmit, role: role, firstname: firstname, lastname: lastname });
  }
  state = {
    noSubmit: false,
    role: '',
    firstname: '',
    lastname: '',
    code: ''
  }
  onPress = () => {
    console.log('click!');
    if (moment().format('dddd') == "Saturday" || moment().format('dddd') == "Sunday"){
      this.setState({ noSubmit: true });
    } else {
      firebase.database().ref().child("attendance/").orderByChild("name").equalTo(this.state.firstname + ' ' + this.state.lastname).once("value",snapshot => {
        if (snapshot.exists()){
          const userData = Object.values(snapshot.val());
          const a = userData.filter((value)=>{
            return value.date === dayFormat;
          }).length
          if (a > 0) {
            Alert.alert('Oops, You cannot register twice in a day!');
            this.setState({ noSubmit: true });
          } else {
            this.setState({ noSubmit: false })
            firebase.database().ref('attendance/').push(
              {
                  name: this.state.firstname + ' ' + this.state.lastname,
                  date: dayFormat,
                  role: this.state.role,
                  time: time,
                  dateString: stringDay,
                  verifyCode: this.state.code
              }
            ).then((data)=>{
                console.log('PUSHED!');
                console.log(data.key);
                this.props.navigation.goBack();
            }).catch((error)=>{
                console.log(error);
            });
          }
        } else {
          firebase.database().ref('attendance/').push(
            {
                name: this.state.firstname + ' ' + this.state.lastname,
                date: dayFormat,
                role: this.state.role,
                time: time,
                dateString: stringDay,
                verifyCode: this.state.code
            }
          ).then((data)=>{
              console.log('PUSHED!');
              console.log(data.key);
              this.props.navigation.goBack();
          }).catch((error)=>{
              console.log(error);
          });
        }
      });
    }
  }
  render() {
    return (
      <View style={styles.main}>
            <View style={styles.header}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.e}>e</Text><Text style={styles.besideE}>-track</Text>
                </View>
                <Icon 
                name="md-close" 
                style={{ color: color.darkGrey, fontSize: 35, marginTop: 15 }}
                onPress={()=> this.props.navigation.goBack()}
                />
            </View>
            <Text style={{ padding: 15, color: color.darkGrey, fontSize: 14 }}>Enter your details into the E-Tracking Attendance register...</Text>
            <View>
              <InputAtom 
                placeholder={'Type Verify Code'}
                onChangeText={(str)=> this.setState({ code: str })}
                value={this.state.code}
                maxLength={7}
              />
              <InputAtom 
                placeholder={'Enter Date'}
                onChangeText={(str)=> this.setState({ date: str })}
                value={dayFormat}
                maxLength={15}
                disabled={true}
              />
              <InputAtom 
                placeholder={'Enter company role'}
                onChangeText={(str)=> this.setState({ role: str })}
                value={this.state.role}
                maxLength={30}
              />
              <ButtonAtom 
              text={'SUBMIT'}
              textStyle={{ color: color.white }}
              disabled={this.state.noSubmit}
              onPress={this.onPress}
              />
            </View>
        </View>
    );
  }
}

export default AddNewRecord;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#FFF"
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