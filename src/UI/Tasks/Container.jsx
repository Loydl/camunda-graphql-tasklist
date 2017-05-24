import React from 'react';
import { Link, Route } from 'react-router-dom'

import List from './List';

const Container = ({ match }) => {
    return (
        <div>
            <div className='row'>
                <div className='col-md-2'>
                    <ul className='list-group'>
                        <li className='list-group-item'><Link to={`${match.url}/myTasks`}>My Tasks</Link></li>
                        <li className='list-group-item'><Link to={`${match.url}/all`}>All Tasks</Link></li>
                    </ul>
                </div>
                <div className='col-md-10'>
                    <Route path={`${match.url}/:userId`} component={List} />
                </div>
            </div>
        </div>
    )
};

export default Container;