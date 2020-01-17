import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import RouteList from './RouteList';
import { mockDriverId } from '../../_mock';
import COLOR from '../Colors';
import { MenuButton, Spinner, NoticeText } from '../common';
import CellSection from '../ProfileView/CellSection';
import { getDeliveryRoutes, getLocationIds, groupOrdersByLocation } from '../Utils';
import { DRIVER_QUERY } from '../QueryUtils';

const { width, height } = Dimensions.get('window');

class HomeView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { headerStyle, headerRightStyle } = styles;
    return {
      headerTitle: (
        <View>
          <Text style={headerStyle}>
            {navigation.getParam('firstName', 'loading...')}
          </Text>
        </View>
      ),
      headerTitleStyle: {
        display: 'flex',
        jusfityContent: 'center',
        alignItems: 'center',
      },
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerRight: (
        <View>
          <Text style={headerRightStyle}>{moment().format('MM/DD')}</Text>
        </View>
      ),
      headerLeft: (<MenuButton navigation={navigation} />),
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firstName !== prevState.firstName) {
      nextProps.navigation.setParams({ firstName: nextProps.firstName });
      return { firstName: nextProps.firstName, reload: true };
    }
    return null;
  }

  state = {
    firstName: null,
    deliveryRoutes: [],
    locationToOrders: {},
    reload: false,
  };

  componentDidMount() {
    const { loginDriver, driverId } = this.props;
    loginDriver(driverId);
  }

  renderRouteList = () => {
    const { navigation, driverLoading } = this.props;
    const { deliveryRoutes, locationToOrders, reload } = this.state;
    if (!driverLoading) {
      if (reload) {
        this.parseData();
      }
      if (deliveryRoutes.length !== 0) {
        return (
          <CellSection
            style={{ height, width }}
          >
            <RouteList
              navigation={navigation}
              routes={deliveryRoutes}
              locationToOrders={locationToOrders}
            />
          </CellSection>
        );
      }
      return <NoticeText text="No Delivery Task for Today" />;
    }
    return <Spinner />;
  }

  parseData = () => {
    const {
      deals, updateAllLocations,
      updateRestaurantId,
      restaurant,
    } = this.props;
    // array of (dealId, locations) pairs
    const deliveryRoutes = getDeliveryRoutes(deals);
    // array of locationIds
    const locationIds = getLocationIds(deliveryRoutes);
    // map of locationId to orders
    const locationToOrders = groupOrdersByLocation(deals, locationIds);

    this.setState({
      deliveryRoutes,
      locationToOrders,
      reload: false,
    });
    updateAllLocations(locationIds);
    updateRestaurantId(restaurant.restaurantId);
  }

  render() {
    return (
      <View style={styles.backgroundStyle}>
        {this.renderRouteList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerRightStyle: {
    marginRight: 30,
    fontSize: 12,
  },
  backgroundStyle: {
    height: '100%',
    backgroundColor: COLOR.VWHITE,
  },
});

const mapStateToProps = () => ({
  driverId: mockDriverId,
  endedAt: '2019-12-28',
});

const mapDispatchToProps = (dispatch) => ({
  loginDriver: (id) => dispatch({
    type: 'LOGIN_DRIVER',
    id,
  }),
  updateAllLocations: (locationIds) => dispatch({
    type: 'UPDATE_ALL_LOCATIONS',
    locationIds,
  }),
  updateRestaurantId: (restaurantId) => dispatch({
    type: 'UPDATE_RESTAURANT_ID',
    restaurantId,
  }),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(DRIVER_QUERY, {
    options: ({ driverId, endedAt }) => ({
      variables: {
        driverId,
        endedAt,
      },
    }),
    props: ({ data: { driver, loading } }) => ({
      driverLoading: loading,
      ...driver,
    }),
  }),
)(HomeView);
