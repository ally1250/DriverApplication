import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import COLOR from '../Colors';
import EditSection from './EditSection';
import { BackButton } from '../common';

const { height, width } = Dimensions.get('window');

class EditScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      borderColor: 'white',
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
        <Text style={{ color: COLOR.BLUE, marginRight: 30, fontSize: 14 }}>Submit</Text>
      </TouchableOpacity>),
    headerLeft: <BackButton navigation={navigation} />,
  })

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.state = {
      content: navigation.getParam('content', ''),
    };
  }

  onSubmit = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  updateState = (content) => {
    this.setState({ content });
  }

  render() {
    const {
      modalStyle,
      textContainerStyle,
      titleTextStyle,
      editorContainerStyle,
      seperatorStyle,
    } = styles;

    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    const { content } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={modalStyle}>
          <View style={seperatorStyle} />
          <View style={textContainerStyle}>
            <Text style={titleTextStyle}>{title}</Text>
          </View>
          <View style={editorContainerStyle}>
            <EditSection
              value={content}
              navigation={navigation}
              customStyles={{ textAlign: 'center' }}
              onChangeText={(text) => this.updateState(text)}
              placeholder={title}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    width,
    height,
  },
  textContainerStyle: {
    justifyContent: 'center',
    marginTop: 30,
  },
  titleTextStyle: {
    color: 'black',
    fontSize: 24,
    alignSelf: 'center',
  },
  editorContainerStyle: {
    paddingHorizontal: 24,
    height: Dimensions.get('screen').height / 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  seperatorStyle: {
    height: 8,
    backgroundColor: COLOR.VWHITE,
    width: '100%',
  },
});

export default EditScreen;
