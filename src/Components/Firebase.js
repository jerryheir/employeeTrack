import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';

/*const config = {
    apiKey: "AIzaSyBK-AEv7TcMjKVhM6WZltuwXShy0QCia1M",
    authDomain: "employee-track-69a0b.firebaseapp.com",
    databaseURL: "https://employee-track-69a0b.firebaseio.com",
    projectId: "employee-track-69a0b",
    storageBucket: "employee-track-69a0b.appspot.com",
    messagingSenderId: "798802728250"
};
firebase.initializeApp(config);*/

export default class Firebase extends Component {
    componentDidMount () {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const time = today.getTime();
        const currentDay = dd + mm + yyyy
        /*firebase.database().ref('users').once('value', (data) => {
            console.log(data.toJSON()); // select database once and never runs again...
        })*/
        firebase.database().ref('users').on('value', (data) => {
            console.log(data.toJSON());
        });

        setTimeout(() => {
            firebase.database().ref('users/003').set(
            {
                username: 'Brother John',
                password: 'brother',
                role: 'Chief One',
                date: currentDay,
                time: time
            }
            ).then(()=>{
                console.log('INSERTED!');
            }).catch((error)=>{
                console.log(error);
            })
        }, 5000);

        /*setTimeout(() => {
            firebase.database().ref('users/001').update({
                username: 'Johnson',
                password: 'brother',
                role: 'Marketer'
            });
        }, 10000);*/
        firebase.database().ref('users/003/name').remove();


    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello Firebase!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});