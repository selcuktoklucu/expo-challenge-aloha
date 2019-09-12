import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, Dimensions,ImageBackground } from 'react-native';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import { AppLoading, } from 'expo';
import { Asset } from 'expo-asset';
//import Async from 'react-promise'
import Main from './Main'
const bckImage = require('./pizza_background.png')
import { updateCurrent } from './src/redux/actions'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class App extends Component {

  render(){
    return (
      <Provider store={store}>
          <Main />
      </Provider>
    );
  }
}
