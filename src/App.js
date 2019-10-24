import React from 'react';
import Layout from './hoc/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import LoggedUserProvider from './context/LoggedUserContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const App = () => {
  return (
    <div>
        <LoggedUserProvider>
          <ApolloProvider client={client}>
            <Layout />
          </ApolloProvider>
        </LoggedUserProvider>
    </div>
  );
}

export default App;
