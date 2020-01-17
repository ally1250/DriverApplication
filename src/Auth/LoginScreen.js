import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import EditSection from '../ProfileView/EditSection';
import { ActionButton } from '../common';
import { SIGN_IN_MUTATION } from '../MutationUtils';

const { height, width } = Dimensions.get('window');

class LoginScreen extends Component {
  state = {
    emailErrorMsg: '',
    passwordErrorMsg: '',
    email: '',
    password: '',
    loading: false,
  }

  resetErrorState = () => {
    this.setState({
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });
  }

  updateEmail = (email) => {
    this.setState({ email });
  }

  updatePassword = (password) => {
    this.setState({ password });
  }

  handleSubmit = () => {
    const {
      loginDriver,
      navigation,
      signIn,
      unsetLoading,
      setLoading,
    } = this.props;
    const { email, password } = this.state;
    const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.resetErrorState();

    let emailError = false;
    let passwordError = false;

    const setEmailError = (msg) => {
      emailError = msg !== '';
      this.setState({ emailErrorMsg: msg });
    };
    const setPasswordError = (msg) => {
      passwordError = msg !== '';
      this.setState({ passwordErrorMsg: msg });
    };
    Keyboard.dismiss();

    if (email.length === 0) {
      // Email Emptry
      setEmailError('Please enter your email');
    } else if (!emailRe.test(email)) {
      // Email invalid
      setEmailError('Make sure the email is valid');
    } else {
      setEmailError('');
    }

    if (password.length === 0) {
      // Password empty
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }

    // if information is valid
    if (!emailError && !passwordError) {
      console.log('signning in');
      setLoading();

      const validatedValues = {
        email,
        password,
      };
      signIn(validatedValues)
        .then(async ({ data: { signInDriver: { token, refreshToken, id } } }) => {
          unsetLoading('');
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          loginDriver(id);
          navigation.navigate('App');
        })
        .catch((error) => {
          console.log('In Function', error);
          unsetLoading(error);
        });
    }
  }

  handleNav = () => {
    const { navigation } = this.props;
    this.resetErrorState();
    navigation.navigate('SignUpScreen');
  }

  render() {
    const {
      emailErrorMsg,
      passwordErrorMsg,
      email,
      password,
      loading,
    } = this.state;
    const {
      headerContainerStyle,
      titleTextStyle,
      loginSheetStyle,
      footerContainer,
      connectContainerStyle,
      forgotContainerStyle,
      legendTextStyle,
      loginButtonContainerStyle,
      centerLegendContainerStyle,
    } = styles;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ height, width }}>
          {/* HEADER */}
          <View style={headerContainerStyle}>
            <Text style={titleTextStyle}> Login </Text>
          </View>
          {/* LOGIN SHEET */}
          <View style={loginSheetStyle}>
            <EditSection
              iconName="mail-outline"
              placeholder="Email"
              errorMessage={emailErrorMsg}
              autoCapitalize={false}
              onChangeText={(text) => this.updateEmail(text)}
              value={email}
            />
            <EditSection
              iconName="lock-open"
              placeholder="Password"
              errorMessage={passwordErrorMsg}
              secureTextEntry
              onChangeText={(text) => this.updatePassword(text)}
              value={password}
            />
            <View style={loginButtonContainerStyle}>
              <ActionButton
                label="LOGIN"
                loading={loading}
                onPress={this.handleSubmit}
              />
            </View>
            <View style={forgotContainerStyle}>
              <TouchableOpacity
                onPress={() => {}}
              >
                <Text style={legendTextStyle}> Forgot password </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* OPTION SHEET */}
          <View style={connectContainerStyle}>
            <View style={centerLegendContainerStyle}>
              <Text style={legendTextStyle}>{/* Or Login Using */}</Text>
            </View>
          </View>
          {/* FOOTER */}
          <View style={footerContainer}>
            <View style={centerLegendContainerStyle}>
              <Text style={legendTextStyle}>Don&apos;t have an account yet?</Text>
            </View>
            <TouchableOpacity style={{ margin: 5 }} onPress={this.handleNav}>
              <Text style={[legendTextStyle, { fontWeight: 'bold' }]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginSheetStyle: {
    height: '40%',
    paddingLeft: '12%',
    paddingRight: '12%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  connectContainerStyle: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  footerContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgotContainerStyle: {
    alignSelf: 'center',
  },
  centerLegendContainerStyle: {
    margin: 5,
    alignSelf: 'center',
  },

  loginButtonContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 25,
    marginBottom: 10,
  },
  loginWithButtonContainerStyle: {
    flexDirection: 'row',
  },

  entryInputStyle: {
    fontSize: 18,
  },

  titleTextStyle: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
  },
  legendTextStyle: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },

  btnStyle: {
    borderColor: 'green',
  },
  textStyle: {
    color: 'green',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
});

const mapStateToProps = ({ auth }) => {
  const {
    error, loading,
  } = auth;

  return {
    error, loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginDriver: (driverId) => dispatch({
    type: 'LOGIN_DRIVER',
    driverId,
  }),
  unsetLoading: (error) => dispatch({
    type: 'UNSET_LOADING',
    error,
  }),
  setLoading: () => dispatch({
    type: 'SET_LOADING',
  }),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ), graphql(SIGN_IN_MUTATION, {
    props: ({ mutate }) => ({
      signIn: (variables) => mutate({ variables }),
    }),
  }),
)(LoginScreen);
