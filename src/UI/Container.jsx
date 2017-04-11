import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import TasksContainer from './Tasks/Container';

const Container = () => {
    return(
        <Router>
            <div className='container-fluid'>
                <Navbar />
                <Route path='/tasks' component={TasksContainer} />
            </div>
        </Router>
    )
};

export default Container;