import React from 'react';
import ReactDom from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from './UI/Container';

// create new Client

const client =  new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: __CAMUNDA_GRAPHQL_SERVER__
    })
});

// render into <div id="root"></div>
ReactDom.render(
    <ApolloProvider client={client}>
        <Router>
            <Container/>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);