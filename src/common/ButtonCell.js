import React from 'react';
import {
  Text, View, TouchableHighlight, StyleSheet,
} from 'react-native';
import COLOR from '../Colors';

const ButtonCell = ({ onPress, title }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={0.9}
    underlayColor={COLOR.LGREY}
  >
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    color: COLOR.BLUE,
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default ButtonCell;
