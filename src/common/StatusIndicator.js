import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';
import { STATUS_COLOR } from '../Constants';

Icon.loadFont();

const StatusIndicator = ({ status, dotOnly, style }) => {
  const width = dotOnly ? 10 : 120;
  return (
    <View style={[styles.containerStyle, style, { width }]}>
      <View style={[styles.circle, { backgroundColor: STATUS_COLOR[status] }]} />
      {!dotOnly ? <Text style={styles.statusStyle}>{status}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusStyle: {
    color: COLOR.VBLACK,
    fontSize: 14,
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 30,
  },
});

export default StatusIndicator;
