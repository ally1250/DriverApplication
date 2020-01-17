/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

export const getDeliveryRoutes = (deals) => deals.map((deal) => ({
  dealId: deal.dealId,
  locations: _.chain(deal.routes)
    .flatten()
    .map('location')
    .uniqBy('locationId')
    .value(),
}));

export const getLocationIds = (deliveryRoutes) => _.chain(deliveryRoutes)
  .map('locations')
  .flatten()
  .uniqBy('locationId')
  .map('locationId')
  .value();

export const groupOrdersByLocation = (deals, locationIds) => _.chain(deals)
  .map('orders')
  .flatten()
  .filter((order) => locationIds.indexOf(order.delivery.location.locationId) >= 0)
  .groupBy((order) => order.delivery.location.locationId)
  .value();

export const formatTime = (time) => moment(time).format('HH:mm');

export const convertMomentToMili = (time) => moment(time, 'YYYY-MM-DD').valueOf();

export const compareTime = (time1, time2) => moment(time1, 'YYYY-MM-DD').isBefore(moment(time2, 'YYYY-MM-DD'));
