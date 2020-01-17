import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusIndicator } from '../common';
import { DELIVERY, STATUS_TYPE } from '../Constants';
import COLOR from '../Colors';
import { formatTime } from '../Utils';
import LocationCell from './LocationCell';

Icon.loadFont();

class RouteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndecies: [],
    };
  }

  onSelectRoute = (index) => {
    const { expandedIndecies } = this.state;
    const arr = { ...expandedIndecies };
    if (!arr[index]) {
      arr[index] = true;
    } else {
      arr[index] = !arr[index];
    }

    this.setState({ expandedIndecies: arr });
  }

  getRouteStatus = (locations) => {
    let i = 0;
    while (locations[i].status === DELIVERY.DELIVERED) {
      i += 1;
    }
    if (i === locations.length) {
      return STATUS_TYPE.COMPLETED;
    }
    if (i === 0) {
      return STATUS_TYPE.UNSTARTED;
    }
    return STATUS_TYPE.IN_PROGRESS;
  }

  getCurrentLocationIndex = (locations) => {
    let i = 0;
    while (locations[i].status === DELIVERY.DELIVERED) {
      i += 1;
    }
    return i;
  }

  renderLocations = (locations, status, routeIndex, timeRange) => {
    const {
      buttonStyle,
      buttonContainerStyle,
      containerStyle,
    } = styles;
    const { locationToOrders, routes, navigation } = this.props;
    return (
      <View style={containerStyle}>
        {locations.map((loc, locIndex) => (
          <LocationCell
            location={loc}
            locationIndex={locIndex}
            orders={locationToOrders[loc.locationId]}
            routeIndex={routeIndex}
            routes={routes}
            navigation={navigation}
          />
        ))}
        {status !== STATUS_TYPE.COMPLETED
          ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.startRoute(routeIndex, timeRange)}
            >
              <View style={buttonContainerStyle}>
                {status === STATUS_TYPE.UNSTARTED
                  ? <View style={buttonStyle}><Text style={{ color: 'white' }}>Start Route</Text></View>
                  : <View style={[buttonStyle, { backgroundColor: '#D81500' }]}><Text style={{ color: 'white' }}>Continue Route</Text></View>}
              </View>
            </TouchableOpacity>
          ) : null}
      </View>
    );
  }

  renderRoute = (route) => {
    const {
      itemStyle, stopCountStyle, timeStyle, lineSeperatorStyle, arrorStyle,
    } = styles;
    const { locations } = route.item;
    const numLocations = locations.length;
    const startTime = formatTime(locations[0].startTime);
    const endTime = formatTime(locations[numLocations - 1].endTime);
    const { expandedIndecies } = this.state;
    const stopLabel = numLocations > 1 ? 'Stops' : 'Stop';
    const status = this.getRouteStatus(locations);
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => this.onSelectRoute(route.index)}>
          <View style={itemStyle}>
            <View style={{ flex: 1 / 3 }}><StatusIndicator status={status} /></View>
            <View style={{ flex: 1 / 3, alignItems: 'center' }}><Text style={timeStyle}>{`${startTime} - ${endTime}`}</Text></View>
            <View style={arrorStyle}>
              <Text style={stopCountStyle}>{`${numLocations} ${stopLabel}`}</Text>
              {!expandedIndecies[route.index]
                ? <Icon name="keyboard-arrow-right" size={25} />
                : <Icon name="keyboard-arrow-down" size={25} />}
            </View>
          </View>
          <View style={lineSeperatorStyle} />
        </TouchableOpacity>
        {expandedIndecies[route.index]
          ? (
            <View>
              {this.renderLocations(route.item.locations,
                status, route.index, { startTime, endTime })}
            </View>
          )
          : null}
      </View>
    );
  }

  render() {
    const { routes } = this.props;
    return (
      <FlatList
        style={styles.flatListStyle}
        data={routes}
        renderItem={this.renderRoute}
        keyExtractor={(route) => route.dealId}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  stopCountStyle: {
    fontSize: 14,
    marginRight: 5,
  },
  timeStyle: {
    fontSize: 14,
  },
  lineSeperatorStyle: {
    borderWidth: 0.5,
    borderColor: COLOR.LGREY,
    marginLeft: 10,
    marginRight: 10,
  },
  flatListStyle: {
    marginTop: 8,
    backgroundColor: 'white',
  },
  arrorStyle: {
    flex: 1 / 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 25,
  },
  buttonStyle: {
    height: 30,
    width: 150,
    backgroundColor: COLOR.BLUE,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerStyle: {
    backgroundColor: COLOR.VWHITE,
    marginRight: 15,
    marginLeft: 15,
  },
});

const mapStateToProps = ({ deals }) => ({
  dealId: deals.id,
  dealIndex: deals.index,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimeRange: (timeRange) => dispatch({
    type: 'UPDATE_TIME_RANGE',
    timeRange,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteList);
