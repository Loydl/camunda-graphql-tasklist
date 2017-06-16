import React from 'react';
import { loggedIn, logout } from '../utils/utils';
import { withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Camunda Tasklist</a>
                </div>

                { loggedIn() ? <button className='btn btn-default navbar-btn pull-right' onClick={() => {
                    logout();
                    history.push('/')
                }}>logout</button> : null }
            </div>
        </nav>
    )
};

export default withRouter(Navbar);