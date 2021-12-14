import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, split, HttpLink, ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// use with docker-compose
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8001/v1/graphql',
//   options: {
//     reconnect: true,
//     lazy: true,
//     timeout: 30000
//   }
// });

const wsLink = new WebSocketLink({
  uri: 'ws://hasura:9001/v1alpha1/graphql',
  options: {
    reconnect: true,
    lazy: true,
    timeout: 30000
  }
});

const httpLink = new HttpLink({
  uri: 'http://hasura:9001/v1alpha1/graphql'
});

const client = new ApolloClient({
  link: ApolloLink.from([
    wsLink,
    httpLink
  ]),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}><App /></ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
