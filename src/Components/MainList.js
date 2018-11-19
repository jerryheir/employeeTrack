import React, {Component} from 'react';
import {Platform, StyleSheet, FlatList, ActivityIndicator, Text, View} from 'react-native';
import MainListAtom from '../Atoms/MainListAtom';
import { color } from '../Styles/Color';
import * as firebase from 'firebase';
import moment from 'moment';
import { retrieveItem } from "../Functions";
import PickerAtom from "../Atoms/PickerAtom";
import FabAtom from '../Atoms/FabAtom';
// import Firebase from './src/Components/Firebase';

const day = moment().format('L');
const format = day.replace('/', '-');
const dayFormat = format.replace('/', '-');
console.log(dayFormat);
const previous1 = moment().subtract(1, 'days').format('MM-DD-YYYY');
const previous2 = moment().add(-2, 'days').format('MM-DD-YYYY');
console.log('This is previous = ' + previous1 + ' Or we use ' + previous2);
/*const split = dayFormat.split("-");
const splitDay = parseInt(split[1], 10);
let num;
if (splitDay == 1){
  let num 
}*/
const stringDay = moment().format('LL'); 
console.log(stringDay);
const time = moment().format('LT');
console.log(time);
console.log(moment().format('dddd'));

export default class MainList extends Component {
  async componentDidMount (){
    /*const config = {
      apiKey: "AIzaSyBK-AEv7TcMjKVhM6WZltuwXShy0QCia1M",
      authDomain: "employee-track-69a0b.firebaseapp.com",
      databaseURL: "https://employee-track-69a0b.firebaseio.com",
      projectId: "employee-track-69a0b",
      storageBucket: "employee-track-69a0b.appspot.com",
      messagingSenderId: "798802728250"
    };
    firebase.initializeApp(config);*/
    const email = await retrieveItem('email');
    const newEmail = email.replace(/[^\w\s]/gi, '');
    firebase.database().ref(`users/${newEmail}`).once('value', (snapshot) => {
      const firstname = snapshot.val().firstname;
      const lastname = snapshot.val().lastname;
      const role = snapshot.val().role;
      console.log(firstname + ' ' + lastname + ' ' + role + ' ');
      this.setState({ firstname, lastname, role });
    })
    firebase.database().ref('attendance/').limitToLast(20).on('value', (snapshot) => {
      let newData = Object.values(snapshot.val());
      console.log(newData); // select database once and never runs again...
      this.setState({ data: newData, loading: false });
    })
  }
  state = {
    data: [],
    loading: true,
    selectedValue: '',
    firstname: '',
    lastname: '',
    role: '',
    error: false
  }
  onValueChange = (selectedValue, cool)=>{
    this.setState({ selectedValue });
    if (selectedValue != dayFormat){
      firebase.database().ref().child('attendance/').orderByChild("date").equalTo(selectedValue).once('value', (data) => {
        // console.log(data); // select database once and never runs again...
        // this.setState({ data: data });
        if (data.val() != null && data.val() != undefined){
          let newData = Object.values(data.val());
          this.setState({ data: newData, loading: false });
        } else {
          this.setState({ error: true });
          setTimeout(() => {
            this.setState({ error: false, selectedValue: '' });
          }, 2000);
        }
      })
    } else {
      firebase.database().ref('attendance/').limitToLast(20).on('value', (snapshot) => {
        let newData = Object.values(snapshot.val());
        console.log(newData); // select database runs forever...
        this.setState({ data: newData, loading: false });
      })
    }

  }

  createAttendance = () => {
    const { firstname, lastname, role } = this.state;
    this.props.navigation.navigate('AddNewRecord', { firstname, lastname, role });
  }

  renderItem = ({ item, index }) => {
    return (
      <MainListAtom
      date={item.date}
      name={item.name}
      role={item.role}
      time={item.time}
      verifyCode={item.verifyCode}
      key={index}
      />
    )
  }
  render() {
    return (
      <View style={styles.flatlistContainer}>
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.e}>e</Text><Text style={styles.besideE}>-track</Text>
                </View>
                {
                  !this.state.loading && 
                  <PickerAtom 
                  list={[ dayFormat, previous1, previous2 ]}
                  onValueChange={this.onValueChange}
                  selectedValue={this.state.selectedValue}
                  viewStyle={{ padding: 10, width: '50%' }}
                  />
                }
            </View>
        </View>
        {
          this.state.error && 
          <View style={{ height: 45, width: '100%', backgroundColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center' }}>
            <Text>There were no results for your search!</Text>
          </View>
        }
        {
          this.state.loading && 
            <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={color.primary} size={'large'} />
            </View>
        }
        {
          !this.state.loading &&
            <FlatList 
            data={this.state.data.reverse()}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        }
          <FabAtom 
          disabled={this.state.loading}
          onPress={this.createAttendance}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  headerContainer: {
    paddingTop: 30
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