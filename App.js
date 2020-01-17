import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { PersistGate } from 'redux-persist/integration/react';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import AsyncStorage from '@react-native-community/async-storage';

import TabNavigator from './Router';
import LandingView from './src/LandingView';
import { persistor, store } from './reducers';
import AuthNavigator from './components/Auth';

const cache = new InMemoryCache({
  // eslint-disable-next-line no-underscore-dangle
  dataIdFromObject: (object) => object[`${object.__typename.toLowerCase()}Id`] || defaultDataIdFromObject(object),
});

const request = async (operation) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (authToken && refreshToken) {
      operation.setContext({
        headers: {
          authToken,
          refreshToken,
        },
      });
    }
  } catch (e) {
    console.log('error reading value:', e);
  }
};

const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let handle;
  Promise.resolve(operation)
    .then((oper) => request(oper))
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, status }) => {
          console.error(message, status);
        });
      }
      if (networkError) {
        console.log(networkError);
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache: localCache }) => {
            localCache.writeData({ data: { isConnected } });
            return null;
          },
        },
      },
      cache,
    }),
    new HttpLink({
      uri: 'https://tritonbyte-server.herokuapp.com/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache,
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Landing: LandingView,
    Auth: AuthNavigator,
    App: TabNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
));

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <PersistGate loading={<View />} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </ApolloProvider>
      </Provider>
    );
  }
}
