import gql from 'graphql-tag';

// query driver basic information
export const DRIVER_QUERY = gql`
  query Driver($driverId: ID!) {
    driver(driverId: $driverId) {
      driverId
      lastName
      firstName
      address
      avatar
      phone
    }
  }
`;

// query locations for one route, including orders at that location
export const LOCATION_QUERY = gql`
  query PickupLocation($dealId: String!) {
    locations(dealId: $dealId) {
      locationId
      name
      alias
      startTime
      endTime
      status
      orders {
        orderId
      }
    }
  }
`;

// query all locations for given deal, then parse result for orders
export const LOCATIONS_QUERY = gql`
  query LocationsByDeal($restaurantId: ID!, $dealId: ID!, $driverId: ID!) {
    pickupLocations(restaurantId: $restaurantId) {
      locationId
      latitude
      longitude
      name
      alias
      startTime
      endTime
      orders(dealId: $dealId) {
        orderId
        customer {

        }
        items {
          itemId
          name
          price
          numOrdered
        }
        delivery(driverId: $driverId) {
          location {
            locationId
          }
          status
        }
        status
      }
    }
  }
`;

// query driver details
export const DRIVER_QUERY = gql`
  query Driver($driverId: ID, $endedAt: String) {
    driver(driverId: $driverId) {
      driverId
      lastName
      firstName
      phone
      restaurant {
        restaurantId
      }
      deals(endedAt: $endedAt) {
        dealId
        items {
          itemId
          name
          price
          quantity
          inventory
        }
        routes(driver: $driverId) {
          location {
            locationId
            latitude
            longitude
            name
            alias
            startTime
            endTime
          }
          status
        }
        status
        orders {
          orderId
          customer {
            userId
            avatar
            username
            phone
            firstName
            lastName
          }
          items {
            itemId
            name
            price
            numOrdered
          }
          delivery {
            location {
              locationId
            }
            status
          }
          status
        }
      }
    }
  }
`;