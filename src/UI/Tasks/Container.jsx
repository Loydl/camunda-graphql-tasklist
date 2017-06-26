import React from 'react';
import { NavLink, Route } from 'react-router-dom'

import List from './List';

const Container = ({ match }) => {
    return (
        <div>
            <div className='row'>
                <div className='col-md-2'>
                    <div className="list-group">
                        <NavLink activeClassName='active' className='list-group-item' to={`${match.url}/myTasks`}>My Tasks</NavLink>
                        <NavLink activeClassName='active' className='list-group-item' to={`${match.url}/all`}>All Tasks</NavLink>
                    </div>
                </div>
                <div className='col-md-10'>
                    <Route path={`${match.url}/:userId`} component={List} />
                </div>
            </div>
        </div>
    )
};

export default Container;