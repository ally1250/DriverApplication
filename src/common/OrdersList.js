import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Dimensions, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../Colors';

Icon.loadFont();

const { width } = Dimensions.get('window');

class OrdersList extends Component {
  renderItems = (items) => {
    const { itemContainerStyle, lineSeperatorStyle } = styles;

    return (
      <View>
        {items.map((item) => (
          <View style={itemContainerStyle}>
            <Text style={{ marginLeft: 20 }}>{item.name}</Text>
            <Text style={{ marginRight: 20 }}>{`x ${item.quantity}`}</Text>
          </View>
        ))}
        <View style={lineSeperatorStyle} />
      </View>
    );
  }

  renderOrder = (order) => {
    const { itemContainerStyle } = styles;
    return (
      <View>
        <View style={[itemContainerStyle, { marginBottom: 5 }]}>
          <Text style={{ fontWeight: 'bold' }}>{order.item.orderId}</Text>
          <Text style={{ fontWeight: 'bold' }}>{order.item.customer.username}</Text>
        </View>
        {this.renderItems(order.item.items)}
      </View>
    );
  }

  render() {
    const { orders } = this.props;
    return (
      <FlatList
        style={styles.flatListStyle}
        data={orders}
        renderItem={this.renderOrder}
        keyExtractor={(route) => route.dealId}
      />
    );
  }
}

const styles = StyleSheet.create(
  {
    flatListStyle: {
      marginTop: 8,
      backgroundColor: 'white',
    },
    itemContainerStyle: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width,
      paddingLeft: 30,
      paddingRight: 40,
      marginTop: 5,
      marginBottom: 5,
    },
    lineSeperatorStyle: {
      borderWidth: 0.5,
      borderColor: COLOR.LGREY,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      marginBottom: 10,
    },
  },
);

export default OrdersList;
