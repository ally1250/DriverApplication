import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';

const MARGIN_SMALL = 20;
class CellSection extends Component {
  renderWithSeparator = (children) => {
    if (!Array.isArray(children)) {
      return children;
    }
    const toRender = [children[0]];
    let keyIt = 0;
    _.each(children.slice(1, children.length), (child) => {
      toRender.push((
        <View
          key={`profile-separator${Date.now().toString()}${keyIt += 1}`}
          style={[styles.separatorStyle, { marginLeft: MARGIN_SMALL }]}
        />
      ));
      toRender.push(child);
    });
    return toRender;
  };

  render() {
    const { style, children } = this.props;
    return (
      <View style={[styles.containerStyle, style]}>
        {this.renderWithSeparator(children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorStyle: {
    marginRight: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default CellSection;
