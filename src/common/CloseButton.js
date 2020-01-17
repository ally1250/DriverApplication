import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';

Icon.loadFont();

const CloseButton = ({ navigation }) => (
  <TouchableWithoutFeedback
    onPress={() => navigation.navigate('Home')}
  >
    <View style={{ marginLeft: 12 }}>
      <Icon name="close" size={25} color={COLOR.BLACK} />
    </View>
  </TouchableWithoutFeedback>
);

export default CloseButton;
