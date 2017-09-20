import React from 'react';
import { NavLink, Route } from 'react-router-dom'

import List from './List';

const Container = ({ match }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <NavLink activeClassName='active' className='nav-link' to={`${match.url}/myTasks`}>My Tasks</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='active' className='nav-link' to={`${match.url}/all`}>All Tasks</NavLink>
                        </li>
                    </ul>
                </nav>

                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <Route path={`${match.url}/:userId`} component={List} />
                </main>
            </div>

            {/*<div className='row'>
                <div className='col-md-2'>
                    <div className="list-group">
                        <NavLink activeClassName='active' className='list-group-item' to={`${match.url}/myTasks`}>My Tasks</NavLink>
                        <NavLink activeClassName='active' className='list-group-item' to={`${match.url}/all`}>All Tasks</NavLink>
                    </div>
                </div>
                <div className='col-md-10'>
                    <Route path={`${match.url}/:userId`} component={List} />
                </div>
            </div>*/}
        </div>
    )
};

export default Container;