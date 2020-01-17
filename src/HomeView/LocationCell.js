import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';
import { StatusIndicator } from '../common';
import { formatTime } from '../Utils';
import { STATUS_TYPE } from '../Constants';

class LocationCell extends Component {
  getLocationStatus = (status) => {
    if (status === 'EN_ROUTE') {
      return STATUS_TYPE.IN_PROGRESS;
    }
    if (status === 'DELIVERED') {
      return STATUS_TYPE.COMPLETED;
    }
    return STATUS_TYPE.UNSTARTED;
  }

  checkOrders = (routeIndex, locIndex) => {
    const {
      routes,
      navigation,
      updateSelectedDeal,
      updateSelectedLocation,
      orders,
    } = this.props;
    const currentRoute = routes[routeIndex];
    const currLocation = currentRoute.locations[locIndex];
    updateSelectedDeal(currentRoute.dealId, routeIndex);
    updateSelectedLocation(currLocation.locationId, locIndex);
    navigation.navigate('SearchView',
      {
        locationName: currLocation.alias,
        orderCount: orders.length,
      });
  }

  render() {
    const { innerLineSeperatorStyle, locationContainerStyle, locationItemStyle } = styles;
    const {
      location,
      locationIndex,
      routeIndex,
      orders,
    } = this.props;
    const startTime = formatTime(location.startTime);
    const endTime = formatTime(location.endTime);

    return (
      <View>
        <View style={innerLineSeperatorStyle} />
        <View style={locationContainerStyle}>
          <View style={{ ...locationItemStyle, justifyContent: 'flex-start' }}>
            <StatusIndicator status={this.getLocationStatus(location.status)} dotOnly />
            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{location.alias}</Text>
          </View>
          <View style={locationItemStyle}><Text>{`${startTime} - ${endTime}`}</Text></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.checkOrders(routeIndex, locationIndex)}
            style={[locationItemStyle, { justifyContent: 'space-between' }]}
          >
            <View style={{ marginLeft: 20, flexDirection: 'row' }}>
              <Icon name="view-list" size={20} color={COLOR.DGREY} style={{ marginRight: 3 }} />
              <Text style={{ color: COLOR.VBLACK }}>{`${orders.length} orders`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerLineSeperatorStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginLeft: 15,
    marginRight: 15,
  },
  locationContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: COLOR.VWHITE,
  },
  locationItemStyle: {
    flex: 1 / 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedDeal: (id, index) => dispatch({
    type: 'UPDATE_SELECTED_DEAL',
    id,
    index,
  }),
  updateSelectedLocation: (id, index) => dispatch({
    type: 'UPDATE_SELECTED_LOCATION_INDEX',
    id,
    index,
  }),
});

export default connect(null, mapDispatchToProps)(LocationCell);
