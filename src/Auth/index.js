import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const AuthNavigator = createStackNavigator(
  {
    LoginScreen,
    SignUpScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

export default AuthNavigator;
