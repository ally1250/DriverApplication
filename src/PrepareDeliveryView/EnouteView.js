import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BottomSheet from './BottomSheet';
import COLOR from '../Colors';
import {
  ProgressBar, SlidingButton,
} from '../common';
import { LOCATIONS_QUERY } from '../QueryUtils';

Icon.loadFont();

class EnrouteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationDetail: [],
      numOrders: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { locationDetail, locationDetailLoading } = nextProps;
    if (!locationDetailLoading && locationDetail !== prevState.locationDetail) {
      const numOrders = locationDetail.reduce((total, loc) => (
        total + loc.orders.length
      ), 0);
      return { locationDetail: nextProps.locationDetail, numOrders };
    }
    return null;
  }

  onSlideRight = () => {
    const { navigation } = this.props;
    navigation.navigate('ArrivedView');
  }

  onNavigationPressed = () => {
    this.bottomSheetRef.open();
  }

  setRef = (ref) => {
    this.bottomSheetRef = ref;
  }

  render() {
    const {
      progressBarStyle,
      detailSectionStyle,
      lineSeperatorStyle,
      locationTextStyle,
      navigationBackgroundView,
      backgroundSeparatorStyle,
    } = styles;
    const {
      locationDetail, locationIndex, totalOrders, locationDetailLoading,
    } = this.props;
    const { numOrders } = this.state;

    return (
      <View style={{ height: '100%' }}>
        <View style={lineSeperatorStyle} />
        <View style={detailSectionStyle}>
          <View style={{ height: 50 }}>
            {!locationDetailLoading
              ? <Text style={locationTextStyle}>{locationDetail[locationIndex].alias}</Text>
              : null}
          </View>
          {/* TODO: replace with real data */}
          <Text style={{ color: COLOR.RED, fontWeight: 'bold', fontSize: 16 }}>40 min</Text>
          <Text style={{ fontSize: 16, marginTop: 15 }}>{`${numOrders} / ${totalOrders}`}</Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 60, bottom: 40 }}
            activeOpacity={1}
            onPress={this.onNavigationPressed}
          >
            <View style={navigationBackgroundView}>
              <Icon
                name="navigation"
                size={30}
                style={{
                  position: 'absolute', color: 'white', left: 5, top: 5,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={backgroundSeparatorStyle} />
        <View style={progressBarStyle}>
          {!locationDetailLoading
            ? <ProgressBar values={locationDetail} currentLocation={locationIndex} />
            : null}
        </View>
        <SlidingButton
          onSlideRight={this.onSlideRight}
          text="I Have Arrived"
          colors={[COLOR.DRED, COLOR.RED]}
          backgroundColor={COLOR.BGRED}
        />
        {!locationDetailLoading
          ? <BottomSheet setRef={this.setRef} locationDetail={locationDetail[locationIndex]} />
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundSeparatorStyle: {
    height: 8,
    backgroundColor: COLOR.VWHITE,
    width: '100%',
  },
  progressBarStyle: {
    height: '50%',
    paddingLeft: 30,
  },
  detailSectionStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 130,
    paddingTop: 5,
  },
  lineSeperatorStyle: {
    borderWidth: 0.5,
    borderColor: COLOR.LGREY,
    marginLeft: 20,
    marginRight: 20,
  },
  locationTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  navigationBackgroundView: {
    backgroundColor: COLOR.BLUE,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const mapStateToProps = ({ locations, deals }) => ({
  locationIndex: locations.index,
  dealId: deals.id,
  totalOrders: deals.totalOrders,
  timeRange: deals.timeRange,
  restaurantId: deals.restaurantId,
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedLocationIndex: (index) => dispatch({
    type: 'UPDATE_SELECTED_LOCATION_INDEX',
    index,
  }),
  updateSelectedLocationId: (id) => dispatch({
    type: 'UPDATE_SELECTED_LOCATION_ID',
    id,
  }),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(LOCATIONS_QUERY, {
    options: ({ restaurantId, dealId }) => ({
      variables: {
        restaurantId,
        dealId,
      },
    }),
    props: ({ data: { locationsDetail, loading } }) => ({
      locationsDetailLoading: loading,
      locationsDetail,
    }),
  }),
)(EnrouteView);
