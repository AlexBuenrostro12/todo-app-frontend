import React from 'react';
import Layout from './hoc/Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import LoggedUserProvider from './context/LoggedUserContext';
import TicketListProvider from './context/TicketListContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const App = () => {
  return (
    <div>
        <LoggedUserProvider>
          <TicketListProvider>
            <ApolloProvider client={client}>
              <Layout />
            </ApolloProvider>
          </TicketListProvider>
        </LoggedUserProvider>
    </div>
  );
}

export default App;
