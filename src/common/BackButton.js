import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';

Icon.loadFont();

const BackButton = ({ navigation }) => (
  <TouchableWithoutFeedback
    onPress={() => navigation.goBack()}
  >
    <View style={{ marginLeft: 10 }}>
      <Icon name="chevron-left" size={40} color={COLOR.BLACK} />
    </View>
  </TouchableWithoutFeedback>
);

export default BackButton;
