import React from 'react';
import { loggedIn, logout } from '../utils/utils';
import { withRouter, Link } from 'react-router-dom';

const Navbar = ({ history }) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Camunda Tasklist</a>
                </div>

                <ul className="nav navbar-nav navbar-right">
                    { loggedIn() ? <li><Link to="/new">start process</Link></li> : null }
                    { loggedIn() ? <li><a onClick={() => {
                        logout();
                        history.push('/')
                    }}>logout</a></li>
                        : null }
                </ul>
            </div>
        </nav>
    )
};

export default withRouter(Navbar);