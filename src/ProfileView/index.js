import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
} from 'react-native';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cell from './Cell';
import CellSection from './CellSection';
import { ButtonCell, Spinner } from '../common';
import COLOR from '../Colors';
import { DRIVER_QUERY } from '../QueryUtils';

Icon.loadFont();

const PHOTO = {
  uri: 'https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png',
};

class ProfileView extends Component {
  static navigationOptions = () => {
    const { headerStyle } = styles;
    return {
      headerTitle: <View><Text style={headerStyle}>My Profile</Text></View>,
      headerTitleStyle: {
        display: 'flex',
        jusfityContent: 'center',
        alignItems: 'center',
      },
      headerStyle: {
        borderBottomWidth: 0,
      },
    };
  };

  customPhotoPreview = () => {
    const { infoContainerStyle, profilePhotoStyle } = styles;

    return (
      <View style={infoContainerStyle}>
        <Image
          style={profilePhotoStyle}
          source={PHOTO}
        />
      </View>
    );
  }

  navigateToEditScreen = (title, content, target) => {
    const { navigation } = this.props;
    navigation.navigate('EditScreen', {
      title,
      content,
      target,
    });
  }

  renderCell = (title, info) => {
    const {
      bodyStyle,
      textContainerStyle,
      titleTextStyle,
      infoContainerStyle,
      infoTextStyle,
      indicatorContainerStyle,
    } = styles;

    return (
      <View style={bodyStyle}>
        <View style={textContainerStyle}>
          <Text style={titleTextStyle}>{title}</Text>
        </View>
        <View style={infoContainerStyle}>
          <Text style={infoTextStyle}>{info}</Text>
        </View>
        <View style={indicatorContainerStyle}>
          <Icon
            name="chevron-right"
            size={24}
            color={COLOR.GREY}
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      driverLoading,
      lastName,
      firstName,
      phone,
      navigation,
      logoutDriver,
    } = this.props;
    return (
      <ScrollView style={styles.backgroundStyle}>
        {!driverLoading
          ? (
            <CellSection>
              <Cell
                title="Profile Photo"
                customInfo={this.customPhotoPreview()}
              />
              <Cell
                title="First Name"
                info={firstName}
                onPress={() => this.navigateToEditScreen(
                  'First Name', firstName, 'name',
                )}
              />
              <Cell
                title="Last Name"
                info={lastName}
                onPress={() => this.navigateToEditScreen(
                  'Last Name', lastName, 'name',
                )}
              />
              <Cell
                title="Phone"
                info={phone}
                onPress={() => this.navigateToEditScreen(
                  'Phone', phone, 'phone',
                )}
              />
            </CellSection>
          ) : <Spinner />}
        <CellSection>
          <ButtonCell
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              logoutDriver();
              navigation.navigate('Auth');
            }}
            title="Log Out"
          />
        </CellSection>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainerStyle: {
    alignItems: 'flex-end',
  },
  profilePhotoStyle: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  backgroundStyle: {
    height: '100%',
    backgroundColor: COLOR.VWHITE,
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
});

const mapStateToProps = ({ driver }) => ({
  driverId: driver.id,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDriver: () => dispatch({
    type: 'LOGOUT_DRIVER',
  }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(DRIVER_QUERY, {
    options: ({ driverId }) => ({
      variables: {
        driverId,
      },
    }),
    props: ({ data: { driver, loading } }) => ({
      driverLoading: loading,
      ...driver,
    }),
  }),
)(ProfileView);
