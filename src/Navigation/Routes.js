import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import MainList from "../Components/MainList";
import AddNewRecord from "../Components/AddNewRecord";

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        SignUp: {
            screen: SignUp
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: "none"
    }
);

const MainStack = createStackNavigator(
    {
        MainList: {
            screen: MainList
        },
        AddNewRecord: {
            screen: AddNewRecord
        }
    },
    {
        initialRouteName: 'MainList',
        headerMode: "none"
    }
);

const RouteStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Main: MainStack
    },
    {
        initialRouteName: 'Auth'
    }
);

export default RouteStack;