import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import InputAtom from '../Atoms/InputAtom';
import ButtonAtom from '../Atoms/ButtonAtom';
import { storeItem } from '../Functions'
import { color } from "../Styles/Color";

export default class SignUp extends Component {
    componentDidMount (){
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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        error: false,
        loading: ''
    }
    onSignUpPress = () => {
        this.setState({ error: false, loading: true });
        const { email, password } = this.state;
        const newEmail = email.replace(/[^\w\s]/gi, '');
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            console.log('SUCCESSFULLY CREATED!')
            this.setState({ loading: false });
            firebase.database().ref(`users/${newEmail}`).set({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                role: this.state.role
            }).then(()=>{
                console.log('DONE!!!');
                storeItem('email', email);
                this.props.navigation.navigate('Main', { success: 'You can login with details now!' });
            }).catch((error)=>{
                console.log(error);
                this.setState({ error: true, loading: false });
            })
        })
        .catch((error)=>{
            console.log(error);
            this.setState({ error: true, loading: false });
        })
    }
    errorFunc = () => {
        if (this.state.password !== this.state.confirmPassword){
            return (
                <Text style={{ paddingLeft: 32, color: 'red' }}>Password Don't match!</Text>
            )
        }
    }
  render() {
    return (
        <View style={styles.container}>
        <ImageBackground
        style={{ flex: 1 }}
        source={require('../Images/business.png')}
        blurRadius={8}
        resizeMode="cover"
        >
            <View style={{}}>
            <View style={styles.logo}>
                <Text style={styles.e}>e</Text><Text style={styles.besideE}>-track</Text>
            </View>
            {
                this.state.error &&
                (<View style={styles.errorBody}>
                   <Text style={styles.errorText}>Sign Up failed</Text>
                </View>)
            }
            <View style={{ alignSelf: 'center', width: '92%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <InputAtom 
                    placeholder={'First name'}
                    onChangeText={(str)=> this.setState({ firstname: str })}
                    value={this.state.firstname}
                    maxLength={15}
                    style={{ width: '45%'}}
                />
                <InputAtom 
                    placeholder={'Last name'}
                    onChangeText={(str)=> this.setState({ lastname: str })}
                    value={this.state.lastname}
                    maxLength={15}
                    style={{ width: '45%'}}
                />
            </View>
            <InputAtom 
                placeholder={'Type email'}
                onChangeText={(str)=> this.setState({ email: str })}
                value={this.state.email}
                maxLength={35}
            />
            <InputAtom 
                placeholder={'Password'}
                onChangeText={(str)=> this.setState({ password: str })}
                icon={true}
                secureTextEntry={true}
                value={this.state.password}
                maxLength={10}
            />
            <InputAtom 
                placeholder={'Type your COMPANY ROLE'}
                onChangeText={(str)=> this.setState({ role: str })}
                value={this.state.role}
                maxLength={35}
            />
            </View>
            <View style={{ width: '92%', flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                <ButtonAtom 
                text={'CANCEL'}
                style={{ width: '45%', backgroundColor: 'transparent', borderColor: color.primary, borderWidth: 1.5 }}
                textStyle={{ color: color.primary, fontWeight: 'bold' }}
                onPress={()=>this.props.navigation.goBack()}
                />
                <ButtonAtom 
                text={'REGISTER'}
                onPress={this.onSignUpPress}
                style={{ width: '45%' }}
                textStyle={{ color: color.white, fontWeight: 'bold' }}
                />
            </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
    logo: {
      flexDirection: 'row',
      height: 85,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    e: {
      color: color.primary,
      fontSize: 70,
      fontWeight: 'bold'
    },
    besideE: {
      color: color.primary,
      fontWeight: 'bold',
      paddingTop: 20,
      fontSize: 14
    },
    errorBody: { 
        height: 50, 
        width: '80%', 
        alignSelf: 'center', 
        backgroundColor: 'rgba(0, 0, 0, .4)', // color.darkGrey ,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
      },
      errorText: { 
        fontSize: 14, 
        color: color.primary 
      },
  });