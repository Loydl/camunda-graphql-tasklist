import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { loggedIn } from '../utils/utils';

const ProtectedRoute = ( { component: Component, path }) => (
    <Route path={path} render={props => (
        loggedIn() ? (
            <Component {...props}/>
        ) : (
            <Redirect push to={{
                pathname: '/login',
                state: { from: props.location}
            }}/>
        )
    )}/>
);

export default ProtectedRoute;