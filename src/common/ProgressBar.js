import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import COLOR from '../Colors';

const customStyles = {
  stepIndicatorSize: 23,
  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeWidth: 3,
  stepStrokeCurrentColor: COLOR.BLUE, // circle border
  stepStrokeFinishedColor: COLOR.BLUE,
  stepStrokeUnFinishedColor: COLOR.GREY,
  separatorFinishedColor: COLOR.BLUE, // line between circles
  separatorUnFinishedColor: COLOR.GREY,
  separatorStrokeWidth: 3,
  stepIndicatorFinishedColor: COLOR.BLUE, // color inside circle
  stepIndicatorUnFinishedColor: COLOR.GREY,
  stepIndicatorCurrentColor: 'white',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLOR.BLUE, // number inside circle
  stepIndicatorLabelFinishedColor: 'white',
  stepIndicatorLabelUnFinishedColor: 'white',
  labelSize: 14,
  currentStepLabelColor: COLOR.BLUE,
};

const renderLabel = (times, position) => {
  const {
    labelContainerStyle,
    locationContainerStyle,
    locationStyle,
    timeStyle,
    timeContainerStyle,
  } = styles;
  const color = position.position === position.currentPosition ? COLOR.BLUE : 'black';

  return (
    <View style={labelContainerStyle}>
      <View style={locationContainerStyle}>
        <Text style={{ ...locationStyle, color }}>{position.label}</Text>
      </View>
      <View style={timeContainerStyle}>
        <Text style={{ ...timeStyle, color }}>{`${times[position.position].startTime} - ${times[position.position].endTime}`}</Text>
      </View>
    </View>
  );
};

const ProgressBar = ({ values, currentLocation }) => {
  const locations = values.map((loc) => (loc.name));
  const times = values.map((loc) => ({
    startTime: moment(loc.startTime).format('HH:mm'),
    endTime: moment(loc.endTime).format('HH:mm'),
  }));

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentLocation}
      direction="vertical"
      labels={locations}
      stepCount={locations.length}
      renderLabel={() => renderLabel(times)}
    />
  );
};

const styles = StyleSheet.create({
  labelContainerStyle: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  locationContainerStyle: {
    flex: 1,
  },
  locationStyle: {
    marginLeft: 10,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  timeStyle: {
    textAlign: 'right',
  },
  timeContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ProgressBar;
