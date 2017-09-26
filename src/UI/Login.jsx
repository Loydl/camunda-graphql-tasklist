import React from 'react';
import { Redirect } from 'react-router-dom';

import { login } from '../utils/utils';

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            redirectToReferrer: false,
            username: '',
            password: '',
            error: null,
            loading: false
        };
    }



    submitLogin(event) {
        const { username, password } = this.state;

        event.preventDefault();

        this.setState({
            loading: true,
            error: null
        });

        fetch(__JWTAuthProvider__, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if (res.ok) {
                res.text().then(token => {
                    login(token);
                    this.setState({
                        loading: false,
                        redirectToReferrer: true
                    });
                });

            } else {
                res.text().then(err => {
                    console.log('there was an error sending the query', new Error(err));
                    this.setState({
                        loading: false,
                        error: new Error(err, res.status)
                    })
                })

            }
        })
    };

    render() {
        const { username, password, loading, error, redirectToReferrer } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (redirectToReferrer) {
            return (
                <Redirect push to={from} />
            )
        }

        if(loading) {
            return (
                <p>loading...</p>
            )
        }

        return (
            <div className='container'>
                <div className="row justify-content-md-center pt-3">
                    <div className="col-md-auto">
                        <div className="container-fluid bg-light pt-3 pb-3 border rounded">
                            <div className='page-header'>
                                <h1>login</h1>
                            </div>
                            { error ? <div className="alert alert-danger">{ error.message }</div> : null}
                            <p>You must log in to view the page at {from.pathname}</p>
                            <form onSubmit={(event) => this.submitLogin(event)}>
                                <div className='form-group'>
                                    <label>username</label>
                                    <input type="text" value={username} onChange={(event) => this.setState({ username: event.target.value })} className="form-control" />
                                </div>
                                <div className='form-group'>
                                    <label>password</label>
                                    <input type="password" value={password} onChange={(event) => this.setState({ password: event.target.value })} className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/*<div className='page-header'>
                    <h1>login</h1>
                </div>
                { error ? <div className="alert alert-danger">{ error.message }</div> : null}
                <p>You must log in to view the page at {from.pathname}</p>
                <form onSubmit={(event) => this.submitLogin(event)}>
                    <div className='form-group'>
                        <label>username</label>
                        <input type="text" value={username} onChange={(event) => this.setState({ username: event.target.value })} className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label>password</label>
                        <input type="password" value={password} onChange={(event) => this.setState({ password: event.target.value })} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-default pull-right">Submit</button>
                </form>*/}
            </div>
        )
    }
}

export default Login;