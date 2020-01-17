import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import moment from 'moment';
import SearchBarWrap from '../common/SearchBarWrap';
import { OrdersList, NoticeText } from '../common';
import { ORDER } from '../Constants';
import { DRIVER_QUERY } from '../HomeView';
// import COLOR from '../Colors';

Icon.loadFont();
const WIDTH = Dimensions.get('window').width;

class SearchOrdersView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { headerStyle, headerRightStyle } = styles;
    return {
      headerTitle() {
        const allOrders = navigation.getParam('allOrders');
        return (
          <View>
            {allOrders !== undefined ? <Text style={headerStyle}>{`${allOrders.length} orders`}</Text> : null}
          </View>
        );
      },
      headerTitleStyle: {
        display: 'flex',
        jusfityContent: 'center',
        alignItems: 'center',
      },
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerRight: <Text style={headerRightStyle}>{moment().format('MM/DD')}</Text>,
    };
  }

  static processOrderData(routes) {
    let allOrders = [];
    routes.forEach((route) => {
      route.locations.forEach((loc) => {
        allOrders = allOrders.concat(loc.orders);
      });
    });
    return allOrders;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { routes } = nextProps;
    if (routes !== prevState.routes && !nextProps.driverLoading) {
      const allOrders = SearchOrdersView.processOrderData(routes);
      nextProps.navigation.setParams({ allOrders });
      return { ...prevState, allOrders, routes };
    }
    return null;
  }

  state = {
    searchResult: {},
    hasSearchResult: false,
    allOrders: [],
    routes: [],
  };

  handleSearch = () => {
    const { searchText = '' } = this.props;
    const { allOrders } = this.state;
    if (searchText.length !== 0) {
      const searchedOrder = allOrders.filter((order) => (
        order.orderId === searchText
      )).map(({
        orderId, customer, items, status,
      }) => (
        {
          orderId, customer, items, status,
        }
      ));
      if (searchedOrder !== undefined) {
        // if found item
        this.setState({ searchResult: searchedOrder[0], hasSearchResult: true });
      } else {
        // if item not found
        this.setState({ searchResult: null, hasSearchResult: false });
      }
    } else {
      // default if no search text
      this.setState({ searchResult: {}, hasSearchResult: false });
    }
  }

  renderSearchResult = () => {
    const { searchResult, hasSearchResult, allOrders } = this.state;
    const { orders, driverLoading } = this.props;

    let arr = [];
    if (hasSearchResult) {
      arr.push(searchResult);
    } else {
      arr = orders;
    }

    // default: list all orders
    if (!hasSearchResult && !driverLoading) {
      return <OrdersList orders={allOrders} />;
    }
    // have input but no result found
    if (searchResult == null) {
      return <NoticeText text="No results found." />;
    }
    // if order has already been delivered
    if (searchResult.status === ORDER.DELIVERED) {
      return <NoticeText text={'This order has already\nbeen delivered.'} />;
    }
    // if order has been canceled
    if (searchResult.status === ORDER.CANCELLED) {
      return <NoticeText text="This order was canceled." />;
    }
    // for nomral cases: display the search result
    if (searchResult.customer !== undefined) {
      return <View style={{ height: '100%' }}><OrdersList orders={arr} /></View>;
    }
    return <></>;
  }

  handleClear = () => {
    this.setState({ searchResult: {}, hasSearchResult: false });
  }

  renderItems = () => {
    const { itemContainerStyle } = styles;
    const { searchResult } = this.state;

    return searchResult.items.map((item) => (
      <View style={itemContainerStyle}>
        <Text style={{ marginLeft: 20 }}>{item.name}</Text>
        <Text style={{ marginRight: 20 }}>{`x ${item.quantity}`}</Text>
      </View>
    ));
  }

  render() {
    const { orders, driverLoading, navigation } = this.props;
    return (
      <View style={{ height: '100%' }}>
        {!driverLoading
          ? (
            <SearchBarWrap
              orders={orders}
              handleSearch={this.handleSearch}
              handleClear={this.handleClear}
              scanner
              navigation={navigation}
            />
          ) : null}
        {this.renderSearchResult()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: WIDTH,
    paddingLeft: 30,
    paddingRight: 40,
  },
  headerStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerRightStyle: {
    marginRight: 30,
    fontSize: 12,
  },
});

const mapStateToProps = ({
  deals, locations, searchBar, driver,
}) => ({
  dealId: deals.id,
  locationId: locations.id,
  locationIndex: locations.index,
  searchText: searchBar.text,
  driverId: driver.id,
});

export default compose(
  connect(
    mapStateToProps,
  ),
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
)(SearchOrdersView);
