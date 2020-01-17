import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';

class Cell extends Component {
  renderBody() {
    const {
      bodyStyle,
      indicatorContainerStyle,
      infoContainerStyle,
    } = styles;

    return (
      <>
        <View style={bodyStyle}>
          {this.renderTitle()}
          <View style={infoContainerStyle}>
            {this.renderInfo()}
          </View>
          <View style={indicatorContainerStyle}>
            {this.renderIndicator()}
          </View>
        </View>
      </>
    );
  }

  renderTitle = () => {
    const { title } = this.props;
    const {
      textContainerStyle,
      titleTextStyle,
    } = styles;

    return (
      <View style={textContainerStyle}>
        <Text style={titleTextStyle}>{title}</Text>
      </View>
    );
  }

  renderInfo = () => {
    const { info, customInfo } = this.props;
    const {
      infoTextStyle,
    } = styles;
    if (customInfo) {
      return customInfo;
    }
    return (
      <Text style={infoTextStyle}>{info}</Text>
    );
  }

  renderIndicator = () => (
    <Icon
      name="chevron-right"
      size={24}
      color={COLOR.GREY}
    />
  )

  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={COLOR.VWHITE}
        activeOpacity={1}
      >
        <View>
          {this.renderBody()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  bodyStyle: {
    flexDirection: 'row',
    paddingVertical: 14,
    marginLeft: 20,
  },
  indicatorContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 6,
  },
  titleTextStyle: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  infoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  infoTextStyle: {
    fontSize: 15,
    color: COLOR.DGREY,
    alignSelf: 'flex-end',
  },
});

export default Cell;
