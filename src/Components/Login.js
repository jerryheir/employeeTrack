import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import InputAtom from '../Atoms/InputAtom';
import ButtonAtom from '../Atoms/ButtonAtom';
import { color } from '../Styles/Color';
import { storeItem } from '../Functions';

export default class Login extends Component {
    componentDidMount (){
        const config = {
            apiKey: "AIzaSyBK-AEv7TcMjKVhM6WZltuwXShy0QCia1M",
            authDomain: "employee-track-69a0b.firebaseapp.com",
            databaseURL: "https://employee-track-69a0b.firebaseio.com",
            projectId: "employee-track-69a0b",
            storageBucket: "employee-track-69a0b.appspot.com",
            messagingSenderId: "798802728250"
        };
        firebase.initializeApp(config);
    }
    state = {
        email: '',
        password: '',
        error: false,
        check: false,
        loading: ''
    }
    onLoginPress = () => {
        this.setState({ error: false, loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.setState({ loading: false })
            storeItem('email', this.state.email);
            this.props.navigation.navigate('Main', { email: this.state.email });
        })
        .catch((error)=>{
            console.log(error);
            this.setState({ error: true, loading: false });
        })
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
        <View style={{ flex: 14, marginTop: 10 }}>
            <View style={styles.logo}>
                <Text style={styles.e}>e</Text><Text style={styles.besideE}>-track</Text>
            </View>
            {
                this.state.error &&
                (<View style={styles.errorBody}>
                   <Text style={styles.errorText}>Login failed</Text>
                </View>)
            }
            <InputAtom 
                placeholder={'Email'}
                onChangeText={(str)=> this.setState({ email: str })}
                icon={true}
                emailType={true}
                value={this.state.email}
                clearText={()=> this.setState({ email: '' })}
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
            <ButtonAtom 
            text={'Log In'}
            onPress={this.onLoginPress}
            />
            <Text style={{ textAlign: 'center', fontWeight: 'bold', margin: 15, color: color.primary }}>Forgot Password?</Text>
        </View>
                <View style={styles.bottomView}>
                    <Text
                    onPress={()=> this.props.navigation.navigate('SignUp')} 
                    style={{ color: color.primary, fontSize: 16, fontWeight: 'bold' }}
                    >
                        Sign Up
                    </Text>
                    <Text style={{ color: color.primary, fontSize: 16, fontWeight: 'bold' }}>Terms</Text>
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
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    padding: 15,
    width: '100%',
    backgroundColor: 'transparent'
  },
  logo: {
    flexDirection: 'row',
    height: 110,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  e: {
    color: color.primary,
    fontSize: 100,
    fontWeight: 'bold'
  },
  besideE: {
    color: color.primary,
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 16
  }
});