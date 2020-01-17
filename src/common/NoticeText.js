import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoticeText = ({ text }) => {
  const { notificationStyle, displayStyle } = styles;
  return (
    <View style={notificationStyle}>
      <Text style={displayStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  displayStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NoticeText;
