import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Image, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import COLOR from '../Colors';
// import { ORDER } from '../Constants';

const WIDTH = Dimensions.get('window').width;
const QRCode = require('../../icons/QRCodeBlack.png');

class SearchBarWrap extends Component {
  renderSearchBar = (width) => {
    const { inputContainerStyle, searchBarContainerStyle } = styles;
    const {
      text = '',
      handleSearch,
      handleClear,
      textChanged,
    } = this.props;
    return (
      <SearchBar
        placeholder="Search Order #"
        placeholderTextColor={COLOR.GREY}
        onChangeText={textChanged}
        value={text}
        inputStyle={{ color: 'black' }}
        autoCorrect={false}
        keyboardType="default"
        autoCapitalize="none"
        returnKeyType="search"
        inputContainerStyle={inputContainerStyle}
        containerStyle={[searchBarContainerStyle, { width }]}
        round
        searchIcon={{ size: 24 }}
        onSubmitEditing={handleSearch}
        onClear={handleClear}
        rightIconContainerStyle={{ activeOpacity: 1 }}
      />
    );
  }

  onScannerOpen = () => {
    const { navigation } = this.props;
    navigation.navigate('ScanView');
  }

  render() {
    const { scanner = false } = this.props;
    const width = scanner ? WIDTH - 40 : WIDTH;
    const { containerStyle, searchIconContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        {this.renderSearchBar(width)}
        {scanner ? (
          <TouchableOpacity
            style={searchIconContainerStyle}
            activeOpacity={1}
            onPress={this.onScannerOpen}
          >
            <Image
              source={QRCode}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: COLOR.LGREY2,
    borderRadius: 4,
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  containerStyle: {
    width: WIDTH,
    backgroundColor: COLOR.VWHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchIconContainerStyle: {
    marginRight: 5,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ searchBar }) => ({
  text: searchBar.text,
});

const mapDispatchToProps = (dispatch) => ({
  textChanged: (text) => {
    console.log('text', text);
    return dispatch({
      type: 'SEARCH',
      text,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarWrap);
