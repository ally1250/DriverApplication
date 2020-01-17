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
import gql from 'graphql-tag';
import EditSection from '../ProfileView/EditSection';
import { ActionButton } from '../common';

const { height, width } = Dimensions.get('window');

const INITIAL_STATE = {
  confirmPassword: '',
  emailErrorMsg: '',
  phoneErrorMsg: '',
  passwordErrorMsg: '',
  confirmPasswordErrorMsg: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
};

class SignUpScreen extends Component {
  state = { ...INITIAL_STATE };

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value });
    console.log('field', this.state);
  }

  resetField = (field) => {
    this.setState({ [field]: '' });
  }

  resetAllField = () => {
    this.setState({ ...INITIAL_STATE });
  }

  handleSubmit = () => {
    const {
      setLoading,
      unsetLoading,
      loginDriver,
      signUp,
      navigation,
    } = this.props;
    const {
      email,
      phone,
      password,
      firstName,
      lastName,
    } = this.state;
    // eslint-disable-next-line max-len
    const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let phoneError = false;

    const setEmailError = (msg) => {
      emailError = msg !== '';
      this.setState({ emailErrorMsg: msg });
      if (emailError) {
        this.resetField('email');
      }
    };
    const setPasswordError = (msg) => {
      passwordError = msg !== '';
      this.setState({ passwordErrorMsg: msg });
      if (passwordError) {
        this.resetField('password');
      }
    };
    const setConfirmPasswordError = (msg) => {
      confirmPasswordError = msg !== '';
      this.setState({ confirmPasswordErrorMsg: msg });
      if (confirmPasswordError) {
        this.resetField('confirmPassword');
      }
    };
    const setPhoneError = (msg) => {
      phoneError = msg !== '';
      this.setState({ phoneErrorMsg: msg });
      if (phoneError) {
        this.resetField('phone');
      }
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
    } else if (password.length < 6) {
      // Password empty
      setPasswordError('Password needs to have at least 6 charaters');
    } else {
      setPasswordError('');
    }

    const { confirmPassword } = this.state;

    // validate password
    if (confirmPassword.length === 0) {
      setConfirmPasswordError('Please enter your password again');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('The passwords do not match');
    } else {
      setConfirmPasswordError('');
    }

    // validate phone number
    if (!phone.match(/^\d{10}$/)) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }

    // if all information are valid
    if (!emailError && !passwordError && !confirmPasswordError && !phoneError) {
      this.resetAllField();
      setLoading();

      const validatedValues = {
        email,
        phone,
        password,
        firstName,
        lastName,
      };
      signUp(validatedValues)
        .then(async (data, { data: { signUpDriver: { token, refreshToken, id } } }) => {
          console.log(data);
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
    this.resetAllField();
    navigation.goBack();
  }

  render() {
    const {
      loading,
    } = this.props;

    const {
      confirmPassword,
      emailErrorMsg,
      passwordErrorMsg,
      confirmPasswordErrorMsg,
      phoneErrorMsg,
      email,
      phone,
      password,
      firstName,
      lastName,
    } = this.state;
    const {
      headerContainerStyle,
      signupSheetStyle,
      footerContainer,
      titleTextStyle,
      legendTextStyle,
      signupButtonContainerStyle,
      centerLegendContainerStyle,
    } = styles;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ height, width }}>
          {/* HEADER */}
          <View style={headerContainerStyle}>
            <Text style={titleTextStyle}> Sign Up </Text>
          </View>
          {/* SIGNUP SHEET */}
          <View style={signupSheetStyle}>
            <EditSection
              iconName="email"
              placeholder="Email"
              errorMessage={emailErrorMsg}
              autoCapitalize={false}
              onChangeText={(text) => this.handleFieldChange('email', text)}
              value={email}
            />
            <EditSection
              iconName="local-phone"
              placeholder="Phone"
              errorMessage={phoneErrorMsg}
              onChangeText={(text) => this.handleFieldChange('phone', text)}
              value={phone}
            />
            <EditSection
              iconName="perm-identity"
              placeholder="First Name"
              onChangeText={(text) => this.handleFieldChange('firstName', text)}
              value={firstName}
            />
            <EditSection
              iconName="perm-identity"
              placeholder="Last Name"
              onChangeText={(text) => this.handleFieldChange('lastName', text)}
              value={lastName}
            />
            <EditSection
              iconName="lock-open"
              secureTextEntry
              placeholder="Password"
              errorMessage={passwordErrorMsg}
              onChangeText={(text) => this.handleFieldChange('password', text)}
              value={password}
            />
            <EditSection
              iconName="lock-open"
              secureTextEntry
              placeholder="Confirm password"
              errorMessage={confirmPasswordErrorMsg}
              onChangeText={(text) => this.handleFieldChange('confirmPassword', text)}
              value={confirmPassword}
            />
            <View style={signupButtonContainerStyle}>
              <ActionButton
                label="SIGN UP"
                loading={loading}
                onPress={this.handleSubmit}
              />
            </View>
          </View>
          {/* FOOTER */}
          <View style={footerContainer}>
            <View style={centerLegendContainerStyle}>
              <Text style={legendTextStyle}>Already joined us?</Text>
            </View>
            <TouchableOpacity style={{ margin: 5 }} onPress={this.handleNav}>
              <Text style={[legendTextStyle, { fontWeight: 'bold' }]}>
                LOGIN
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
    height: '15%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupSheetStyle: {
    height: '65%',
    paddingLeft: '12%',
    paddingRight: '12%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  footerContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupButtonContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 25,
    marginBottom: 10,
  },

  titleTextStyle: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
  },
  centerLegendContainerStyle: {
    margin: 5,
    alignSelf: 'center',
  },
  legendTextStyle: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
});

const SIGN_UP_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $phone: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUpDriver(
      email: $email
      phone: $phone
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      refreshToken
      id
    }
  }
`;


const mapStateToProps = (state, { auth }) => {
  console.log('current state', state);
  const { error, loading } = auth;
  const {
    email,
    phone,
    password,
    firstName,
    lastName,
  } = state;
  return {
    error,
    loading,
    email,
    phone,
    password,
    firstName,
    lastName,
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
  ), graphql(SIGN_UP_MUTATION, {
    props: ({ mutate }) => ({
      signUp: (variables) => mutate({ variables }),
    }),
  }),
)(SignUpScreen);
