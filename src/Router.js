import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import HomeView from './components/HomeView';
import PrepareDeliveryView from './components/PrepareDeliveryView';
import EnrouteView from './components/PrepareDeliveryView/EnouteView';
import ArrivedView from './components/ArrivedView';
import ScanView from './components/ScanView';
import SearchView from './components/SearchView';
import SearchOrdersView from './components/SearchOrdersView';
import ProfileView from './components/ProfileView';
import EditScreen from './components/ProfileView/EditScreen';
import createHomeNavigator from './components/TabController/createTabNavigator';
import COLOR from './components/Colors';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeView,
    },
    PrepareDeliveryView: {
      screen: PrepareDeliveryView,
    },
    EnrouteView: {
      screen: EnrouteView,
    },
    ArrivedView: {
      screen: ArrivedView,
    },
    ScanView: {
      screen: ScanView,
    },
    SearchView: {
      screen: SearchView,
    },
  }, {
    initialRouteName: 'Home',
  },
);

const OrderListStack = createStackNavigator({
  SearchOrdersView: {
    screen: SearchOrdersView,
  },
});

OrderListStack.navigationOptions = () => ({
  headerTitle: (
    <View>
      <Text style={styles.headerStyle}>{`${moment().format('MM/DD')} Orders`}</Text>
    </View>
  ),
  headerTitleStyle: {
    display: 'flex',
    jusfityContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: 50,
    borderBottomWidth: 0,
  },
});

const ProfileStack = createStackNavigator(
  {
    ProfileView: {
      screen: ProfileView,
    },
    EditScreen,
  },
);

const TabNavigator = createHomeNavigator({
  Home: { screen: HomeStack },
  Orders: { screen: OrderListStack },
  Profile: { screen: ProfileStack },
}, {
  // transitionConfig,
  defaultNavigationOptions: ({ navigation }) => ({
    // Note: extra paras are { focus, horizontal }
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Profile':
          iconName = 'account-circle';
          break;
        case 'Orders':
          iconName = 'view-list';
          break;
        default:
          iconName = 'help';
      }
      return <Icon name={iconName} size={24} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: COLOR.BLUE,
    inactiveTintColor: COLOR.DGREY,
    style: {
      backgroundColor: COLOR.LVWHITE,
      paddingBottom: 5,
      paddingTop: 5,
    },
  },
});

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TabNavigator;

// export default HomeStack;
