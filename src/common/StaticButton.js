// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import COLOR from '../Colors';

const WIDTH = Dimensions.get('window').width;

class StaticButton extends Component {
  state = {
    disabled: false,
  }

  renderIndicator = () => {
    const { label, loading } = this.props;
    const { buttonTextStyle } = styles;

    if (loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }
    return <Text style={buttonTextStyle}>{label}</Text>;
  }

  render() {
    const {
      loading, style, onPress,
    } = this.props;
    const { disabled } = this.state;
    const { buttonStyle } = styles;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={onPress}
        style={{ ...style, buttonStyle }}
        disabled={loading || disabled}
      >
        {this.renderIndicator()}
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonStyle: {
    height: 40,
    width: WIDTH - 150,
    backgroundColor: COLOR.BLUE,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default StaticButton;
