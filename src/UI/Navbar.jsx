import React from 'react';
import { loggedIn, logout, getProfile } from '../utils/utils';
import { NavLink, withRouter, Link } from 'react-router-dom';

const Navbar = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="/">Camunda Tasklist</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    { loggedIn() ? <li className="nav-item"><NavLink activeClassName='active' className="nav-link" to="/new">start process</NavLink></li> : null }
                    { loggedIn() ? <li className="nav-item"><a className="nav-link" onClick={() => {
                        logout();
                        history.push('/')
                    }}>logout</a></li>
                        : null }
                    { loggedIn() ? <span className="navbar-text .text-light">Welcome, {getProfile().username}!</span> : null}
                </ul>
            </div>
        </nav>
    )
};

export default withRouter(Navbar);