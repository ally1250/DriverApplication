import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';

const DRIVER_INITIAL_STATE = {
  id: null,
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  avatar: null,
  error: '',
  loading: false,
};

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'UNSET_LOADING':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const driverReducer = (state = DRIVER_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_DRIVER':
      return {
        ...state,
        id: action.id,
      };
    case 'LOGOUT_USER':
      return DRIVER_INITIAL_STATE;
    case 'UPDATE_PROFILE':
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    default:
      return state;
  }
};

const dealReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DEAL':
      return {
        ...state,
        id: action.id,
        index: action.index,
      };
    case 'UPDATE_TIME_RANGE':
      return {
        ...state,
        timeRange: action.timeRange,
      };
    case 'UPDATE_DEAL_TOTAL_ORDERS':
      return {
        ...state,
        totalOrders: action.totalOrders,
      };
    default:
      return state;
  }
};

const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_RESTAURANT_ID':
      return {
        ...state,
        restaurantId: action.restaurantId,
      };
    case 'UPDATE_SELECTED_LOCATION':
      return {
        ...state,
        id: action.id,
        index: action.index,
      };
    case 'UPDATE_LOCATION_TOTAL_ORDERS':
      return {
        ...state,
        totalOrders: action.totalOrders,
      };
    case 'UPDATE_NUM_MEALS_TOTAL':
      return {
        ...state,
        numMealsTotal: action.numMealsTotal,
      };
    case 'UPDATE_ALL_LOCATIONS':
      return {
        ...state,
        locationIds: action.locationIds,
      };
    default:
      return state;
  }
};

const searchBarReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(config, {
  deals: dealReducer,
  locations: locationReducer,
  driver: driverReducer,
  searchBar: searchBarReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(ReduxThunk)),
);

export const persistor = persistStore(store);
