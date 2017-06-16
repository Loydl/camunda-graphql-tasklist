import React from 'react';
import ReactDom from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { loggedIn, getToken } from './utils/utils';

import Container from './UI/Container';

const networkInterface = createNetworkInterface({
    uri: __CAMUNDA_GRAPHQL_SERVER__
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        if (loggedIn()) {
            const token = getToken();
            req.options.headers.Authorization = `Bearer ${token}`
        }
        next();
    }
}]);

// create new Client

const client =  new ApolloClient({
    networkInterface
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