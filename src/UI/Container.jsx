import React from 'react';
import { Route , withRouter, Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import TasksContainer from './Tasks/Container';
import newProcess from './newProcess/newProcess';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

class Container extends React.Component {

    render() {

        if(this.props.location.pathname === '/') {
            return (
                <Redirect push to='/tasks' />
            )
        }

        return (
            <div>
                <Navbar />
                <Route path='/login' component={Login}/>
                <ProtectedRoute path='/tasks' component={TasksContainer}/>
                <ProtectedRoute path='/new' component={newProcess}/>
            </div>
        )
    }
}

export default withRouter(Container);
