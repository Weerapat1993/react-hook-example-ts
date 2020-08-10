import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContextProvider } from './contexts/AppContextProvider';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { debugContextDevtool } from 'react-context-devtool';

// const client = new ApolloClient({
//   uri: 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex',
//   cache: new InMemoryCache()
// });

const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  container
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// debugContextDevtool(container, {
//   disable: process.env.NODE_ENV === "production"
// });