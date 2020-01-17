import React, { Component } from 'react';
import {
  View, TouchableWithoutFeedback, Animated, StyleSheet, Text, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { DrawerNavigator } from 'react-navigation';
import COLOR from '../Colors';

Icon.loadFont();

const DRAWER_WIDTH = 180;
const { width, height } = Dimensions.get('window');

class MenuButton extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.state = { toggleFlag: 0 };
  }

  toggleOn = () => {
    this.setState({ toggleFlag: 1 }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 250,
        },
      ).start();
    });
  }

  toggleOff = () => {
    this.setState({ toggleFlag: 0 }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 250,
        },
      ).start();
    });
  }

  render() {
    const { toggleFlag } = this.state;
    const animatedValue = this.animatedValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [-DRAWER_WIDTH, 0],
      },
    );

    const animatedStyle = {
      opacity: this.animatedValue.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        },
      ),
    };

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.toggleOn}>
          <Icon name="menu" size={30} style={{ marginLeft: 20 }} color={COLOR.BLACK} />
        </TouchableWithoutFeedback>
        {toggleFlag ? (
          <TouchableWithoutFeedback onPress={this.toggleOff}>
            <Animated.View
              style={[{
                width, height, position: 'absolute', backgroundColor: COLOR.GREY,
              }, animatedStyle]}
              onPress={this.toggleOff}
            />
          </TouchableWithoutFeedback>
        ) : null}
        <Animated.View style={[styles.drawer, { transform: [{ translateX: animatedValue }] }]}>
          <View style={styles.drawerContainer}>
            <Text style={styles.menuLayout}>Buy Now</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    headerText: {
      fontSize: 25,
      textAlign: 'center',
      margin: 10,
      color: 'black',
      fontWeight: 'bold',
    },
    drawer: {
      position: 'absolute',
      left: 0,
      width: DRAWER_WIDTH,
      flexDirection: 'row',
    },
    drawerContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    menuLayout: {
      marginBottom: 1,
      backgroundColor: 'white',
      width: '100%',
      fontSize: 25,
      color: 'white',
      height: 50,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      opacity: 0.5,
      backgroundColor: 'black',
      width,
      height,
    },
  },
);

export default MenuButton;
