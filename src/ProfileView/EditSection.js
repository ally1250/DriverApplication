import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class EditSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusAnim: new Animated.Value(0),
      underlineColor: COLOR.LGREY,
      focused: false,
    };
  }

  onFocus = () => {
    const { focusAnim } = this.state;
    this.setState({ underlineColor: 'white', focused: true },
      () => Animated.timing(focusAnim, {
        toValue: 1,
        duration: 350,
      }).start());
  }

  onBlur = () => {
    const { focusAnim } = this.state;
    this.setState({ underlineColor: COLOR.LGREY, focused: false },
      () => Animated.timing(focusAnim, {
        toValue: 0,
        duration: 350,
      }).start());
  }

  render() {
    const { focusAnim, underlineColor, focused } = this.state;
    const {
      onChangeText,
      placeholder,
      value,
      customStyles,
      errorMessage,
      secureTextEntry,
      selectTextOnFocus,
      iconName,
      autoCapitalize,
      keyboardType,
    } = this.props;
    const {
      containerStyle,
      entryContainerStyle,
      separatorStyle,
      errorTextStyle,
      iconContainerStyle,
      underLineStyle,
      textInputStyle,
    } = styles;

    console.log('autocapitalize', autoCapitalize);

    const color = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR.LGREY, COLOR.BLUE],
    });

    const underLineWidth = focusAnim.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ['0%', '50%', '80%', '90%', '100%'],
    });

    const error = errorMessage && errorMessage !== '' && value === '';

    return (
      <View>
        <View style={containerStyle}>
          <View style={entryContainerStyle}>
            { iconName ? (
              <View style={iconContainerStyle}>
                <AnimatedIcon name={iconName} size={20} style={{ color }} />
              </View>
            ) : <></>}
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={{ ...textInputStyle, ...customStyles, borderBottomColor: underlineColor }}
              selectTextOnFocus={selectTextOnFocus}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autoCorrect={false}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
            />
          </View>
          <View>
            <Animated.View
              style={{
                ...separatorStyle,
                borderColor: color,
                width: underLineWidth,
                alignSelf: 'center',
              }}
            />
            {!focused ? <View style={{ ...separatorStyle, ...underLineStyle }} /> : null}
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', marginBottom: 5 }}>
          <Text style={errorTextStyle}>{error ? errorMessage : ' '}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 2,
    marginBottom: 2,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'column',
    width: '100%',
  },
  entryContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
  },
  separatorStyle: {
    top: 0,
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
  },
  textInputStyle: {
    paddingLeft: 5,
    width: '100%',
    justifyContent: 'center',
    fontSize: 16,
  },
  errorTextStyle: {
    color: COLOR.RED,
    fontSize: 12,
  },
  iconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    paddingVertical: 5,
  },
  underLineStyle: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COLOR.LGREY,
  },
});

export default EditSection;
