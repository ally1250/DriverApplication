import RBSheet from 'react-native-raw-bottom-sheet';
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LaunchNavigator from 'react-native-launch-navigator';
import { formatTime } from '../Utils';
import { StaticButton } from '../common';

Icon.loadFont();

const customStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class BottomSheet extends Component {
  onPress = () => {
    this.bottomSheetRef.close();
  }

  setRef = (ref) => {
    const { setRef } = this.props;
    this.bottomSheetRef = ref;
    setRef(ref);
  }

  navigateByAppleMaps = () => {
    const { locationDetail } = this.props;
    LaunchNavigator.navigate([locationDetail.latitude, locationDetail.longitude], {
      start: '32.825752, -117.154590',
    }).then(() => console.log('Launched navigator'))
      .catch((err) => console.error(`Error launching navigator: ${err}`));
  }

  navigateByGoogleMaps = () => {
    let app = null;

    LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS).then((isAvailable) => {
      if (isAvailable) {
        console.log('isAvailable', isAvailable);
        app = LaunchNavigator.APP.GOOGLE_MAPS;
        LaunchNavigator.setGoogleApiKey('AIzaSyDL2IpxqC1P0j2wrMax5J2f6yycu9CzrI4');
      } else {
        console.warn('Google maps not available - falling back to default navigation app');
        return;
      }

      LaunchNavigator.navigate([32.870982, -117.202743], {
        start: '32.825752, -117.154590',
        app,
      }).then(() => console.log('Launched navigator'))
        .catch((err) => console.error(`Error launching navigator: ${err}`));
    });
  }

  render() {
    const { locationDetail } = this.props;
    const {
      buttonContainerStyle, textStyle, textContainerStyle,
    } = styles;
    const startTime = formatTime(locationDetail.startTime);
    const endTime = formatTime(locationDetail.endTime);
    return (
      <RBSheet
        ref={this.setRef}
        height={250}
        customStyles={customStyles}
      >
        <View style={buttonContainerStyle}>
          {/* TODO: replace with real data */}
          <View style={textContainerStyle}>
            <Text>{`${startTime} - ${endTime}`}</Text>
            <Text style={textStyle}>{locationDetail.name}</Text>
          </View>
          <StaticButton
            onPress={this.navigateByAppleMaps}
            label="Open in Maps"
          />
          <StaticButton
            onPress={this.navigateByGoogleMaps}
            label="Open in Google Maps"
          />
          {/* TODO: add remember my choice selection */}
        </View>
        <TouchableOpacity activeOpacity={1} onPress={this.onPress} style={{ position: 'absolute', top: 15, right: 15 }}>
          <Icon name="close" size={25} />
        </TouchableOpacity>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textContainerStyle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default BottomSheet;
