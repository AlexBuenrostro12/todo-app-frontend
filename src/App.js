import React from 'react';
import Layout from './hoc/Layout';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

client.query({
  query: gql`
      {
        users {
          name
        }
      }
    `
}).then(res => console.log(res)).catch(err => {console.log(err)});

const App = () => {
  return (
    <div>
        <ApolloProvider client={client}>
          <Layout />
        </ApolloProvider>
    </div>
  );
}

export default App;
