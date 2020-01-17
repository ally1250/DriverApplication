import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LandingView extends Component {
  async componentDidMount() {
    const { navigation } = this.props;
    try {
      const token = await AsyncStorage.getItem('token');
      // const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (token) {
        navigation.navigate('App');
      } else {
        console.log('need to sign in');
        navigation.navigate('Auth');
      }
    } catch (e) {
      console.log('error autoSignin... need to sign in again', e);
      navigation.navigate('Auth');
    }
  }

  render() {
    return (<View />);
  }
}

export default LandingView;
