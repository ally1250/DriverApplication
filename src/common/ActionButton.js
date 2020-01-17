// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Animated,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import COLOR from '../Colors';

const WIDTH = Dimensions.get('window').width;

class ActionButton extends Component {
  state = {
    focusAnim: new Animated.Value(0),
    disabled: false,
  }

  handlePress = () => {
    const { focusAnim } = this.state;
    const { onPress } = this.props;
    this.setState({ disabled: true });
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 75,
    }).start(() => Animated.timing(focusAnim, {
      toValue: 0,
      duration: 250,
    }).start(() => this.setState({ disabled: false })));
    onPress();
  }

  handlePressIn = () => {
    const { focusAnim } = this.state;
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 125,
    }).start();
  }

  handlePressOut = () => {
    const { focusAnim } = this.state;
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 125,
    }).start();
  }

  renderIndicator = () => {
    const { label, loading } = this.props;
    const { labelTextStyle } = styles;

    if (loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }
    return <Text style={labelTextStyle}>{label}</Text>;
  }

  render() {
    const { loading } = this.props;
    const { disabled, focusAnim } = this.state;
    const { buttonStyle } = styles;

    const backgroundColor = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR.BLUE, COLOR.BGBLUE],
    });

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.handlePress}
        disabled={loading || disabled}
      >
        <Animated.View
          style={{ ...buttonStyle, backgroundColor }}
        >
          {this.renderIndicator()}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  labelTextStyle: {
    color: COLOR.LVWHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 40,
    width: WIDTH - 130,
    backgroundColor: COLOR.BLUE,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default ActionButton;
