import React from 'react';
import { Route , withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import TasksContainer from './Tasks/Container';


class Container extends React.Component {

    componentDidMount() {
        this.props.location.pathname === '/' ? this.props.history.push('/tasks') : null;
    }

    render() {
        return (
            <div className='container-fluid'>
                <Navbar />
                <Route path='/tasks' component={TasksContainer}/>
            </div>
        )
    }
}

export default withRouter(Container);
