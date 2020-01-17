// import { mockRoutes, mockDriver, mockMeals } from './_mock';
// import { LOCATION_QUERY } from './components/PrepareDeliveryView';
// import { LOCATION_DETAIL_QUERY } from './components/EnrouteView';
// import { DRIVER_QUERY } from './components/HomeView';
// import {
//   MEALS_QUERY,
//   CURR_LOCATION_DETAIL_QUERY,
// } from './components/ArrivedView';

// const orders = [];
// mockRoutes.forEach((route) => {
//   route.locations.forEach((location) => {
//     orders.push({
//       request: {
//         query: CURR_LOCATION_DETAIL_QUERY,
//         variables: {
//           locationId: location.locationId,
//           dealId: route.dealId,
//         },
//       },
//       result: {
//         data: {
//           currLocationDetail: location,
//         },
//       },
//     });
//   });
// });

// const getLocations = mockRoutes.map((route) => ({
//   request: {
//     query: LOCATION_QUERY,
//     variables: {
//       dealId: route.dealId,
//     },
//   },
//   result: {
//     data: {
//       locations: route.locations,
//     },
//   },
// }));

// const locationDetails = mockRoutes.map((route) => ({
//   request: {
//     query: LOCATION_DETAIL_QUERY,
//     variables: {
//       dealId: route.dealId,
//     },
//   },
//   result: {
//     data: {
//       locationDetail: route.locations,
//     },
//   },
// }));

// const allLocations = [];
// mockRoutes.forEach((route) => {
//   route.locations.forEach((location) => {
//     allLocations.push(location);
//   });
// });

// const meals = mockRoutes.map((route) => ({
//   request: {
//     query: MEALS_QUERY,
//     variables: { dealId: route.dealId },
//   },
//   result: {
//     data: {
//       meals: mockMeals,
//     },
//   },
// }));

// const driver = {
//   request: {
//     query: DRIVER_QUERY,
//     variables: { driverId: mockDriver.driverId },
//   },
//   result: {
//     data: {
//       driver: mockDriver,
//     },
//   },
// };

// const mocks = [driver, ...orders, ...getLocations, ...locationDetails, ...meals];
// export default mocks;
