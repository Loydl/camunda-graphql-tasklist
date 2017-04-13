import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import TasksContainer from './Tasks/Container';


export default class Container extends React.Component {

    componentDidMount() {
        this.props.location.pathname === '/' ? this.props.history.push('/tasks') : null;
    }

    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <Navbar />
                    <Route path='/tasks' component={TasksContainer}/>
                </div>
            </Router>
        )
    }
}