// Import libraries for making a components
import React from 'react';
import {
  StyleSheet, Platform, Text, View,
} from 'react-native';

// Make a component
const Header = ({ headerText }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: (Platform.OS === 'ios') ? 88 : 60,
    paddingTop: (Platform.OS === 'ios') ? 44 : 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  },
});

// Make the componenet available to other components
export default Header;
