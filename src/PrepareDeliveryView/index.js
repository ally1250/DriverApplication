import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { mockDriver } from '../../_mock';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import moment from 'moment';
import {
  MenuButton, ProgressBar, SlidingButton,
} from '../common';
import COLOR from '../Colors';
import EnrouteView from './EnouteView';
import { LOCATION_QUERY } from '../QueryUtils';

class PrepareDeliveryView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => {
      const timeRange = navigation.getParam('timeRange');
      return (
        <View>
          {timeRange !== undefined ? <Text>{`${timeRange.startTime} - ${timeRange.endTime}`}</Text> : null}
        </View>
      );
    },
    headerStyle: {
      height: 50,
      borderBottomWidth: 0,
    },
    headerLeft: <MenuButton navigation={navigation} />,
  })

  state = {
    locations: [],
  };

  componentDidMount() {
    const { navigation, timeRange } = this.props;
    navigation.setParams({ timeRange });
  }

  onSlideRight = () => {
    const { updateSelectedLocationIndex, updateSelectedLocationId, locations } = this.props;
    updateSelectedLocationIndex(0);
    updateSelectedLocationId(locations[0].locationId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { locations, locationsLoading } = nextProps;

    if (!locationsLoading && locations !== prevState.locations) {
      const numOrders = locations.reduce((total, loc) => (
        total + loc.orders.length
      ), 0);
      if (!nextProps.numOrders || numOrders > nextProps.numOrders) {
        nextProps.modifyTotalOrders(numOrders);
      }
      return { locations: nextProps.locations };
    }
    return null;
  }

  render() {
    const {
      backgroundSeparatorStyle,
      progressBarStyle, detailSectionStyle,
      lineSeperatorStyle, routeTextStyle,
    } = styles;
    const {
      locations,
      timeRange,
      totalOrders,
      locationsLoading,
      navigation,
      locationIndex = -1,
      dealIndex,
    } = this.props;
    const routeName = `Route ${dealIndex}`;
    return (
      <View style={{ height: '100%' }}>
        {locationIndex === -1
          ? (
            <View>
              <View style={lineSeperatorStyle} />
              <View style={{ height: '100%' }}>
                <View style={detailSectionStyle}>
                  <View style={{ height: 50 }}>
                    <Text style={routeTextStyle}>{routeName}</Text>
                  </View>
                  <Text style={{ fontSize: 16 }}>{`${totalOrders} orders`}</Text>
                  <Text style={{ fontSize: 16, marginTop: 15 }}>{`${timeRange.startTime} - ${timeRange.endTime}`}</Text>
                </View>
                <View style={backgroundSeparatorStyle} />
                <View style={progressBarStyle}>
                  {!locationsLoading
                    ? <ProgressBar values={locations} currentLocation={-1} />
                    : null}
                </View>
                <SlidingButton
                  onSlideRight={this.onSlideRight}
                  text="Start Route"
                  colors={[COLOR.BLUE, COLOR.LBLUE]}
                  backgroundColor={COLOR.BGBLUE}
                />
              </View>
            </View>
          )
          : <EnrouteView navigation={navigation} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
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
  routeTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
});

const mapStateToProps = ({ deals, driver, locations }) => ({
  dealId: deals.id,
  driverId: driver.id,
  timeRange: deals.timeRange,
  totalOrders: deals.totalOrders,
  locationIndex: locations.index,
  dealIndex: deals.index,
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
  modifyTotalOrders: (totalOrders) => dispatch({
    type: 'UPDATE_DEAL_TOTAL_ORDERS',
    totalOrders,
  }),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(LOCATION_QUERY, {
    options: ({ dealId }) => ({
      variables: {
        dealId,
      },
    }),
    props: ({ data: { locations, loading } }) => ({
      locationsLoading: loading,
      locations,
    }),
  }),
)(PrepareDeliveryView);
