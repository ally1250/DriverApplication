import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import React from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

Icon.loadFont();
const WIDTH = Dimensions.get('window').width;

const SlidingButton = ({
  text, onSlideRight, colors, backgroundColor,
}) => {
  const {
    sliderStyle, titleTextStyle, labelContainerStyle, circleStyle, gradientStyle, arrowStyle,
  } = styles;
  return (
    <RNSlidingButton
      style={[sliderStyle, { backgroundColor }]}
      height={45}
      onSlidingSuccess={onSlideRight}
      slideDirection={SlideDirection.RIGHT}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={gradientStyle}
      >
        <View style={circleStyle} />
        <View style={labelContainerStyle}>
          <View>
            <Text numberOfLines={1} style={titleTextStyle}>{text}</Text>
          </View>
          <View style={{ position: 'absolute', right: 50, flexDirection: 'row' }}>
            <Icon name="chevron-right" size={25} style={arrowStyle} />
            <Icon name="chevron-right" size={25} style={arrowStyle} />
            <Icon name="chevron-right" size={25} style={arrowStyle} />
          </View>
        </View>
      </LinearGradient>
    </RNSlidingButton>
  );
};

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  labelContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circleStyle: {
    position: 'absolute',
    height: 38,
    width: 38,
    borderRadius: 21,
    left: 3.5,
    top: 3.5,
    backgroundColor: 'white',
  },
  gradientStyle: {
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    marginRight: -5,
    marginLeft: -5,
    color: 'white',
  },
  sliderStyle: {
    width: WIDTH - 60,
    borderRadius: 22.5,
    left: 30,
    right: 30,
    position: 'absolute',
    bottom: 25,
    backgroundColor: 'white',
  },
});

export default SlidingButton;
