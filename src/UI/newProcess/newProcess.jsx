import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Route, NavLink } from 'react-router-dom';

import startForm from './startForm';

const newProcess = ({ match, data: { loading, processDefinitions, error }}) => {

    function render() {
        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <div className='list-group'>
                { processDefinitions.map(processDefinition => <li key={processDefinition.id} className="nav-item"><NavLink  activeClassName='active' className='nav-link' to={`${match.url}/${processDefinition.id}`}>{processDefinition.name ? processDefinition.name : 'no name'}</NavLink></li>) }
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className='row'>
                <nav className="col-sm-4 col-md-3 d-none d-sm-block bg-light sidebar">
                    <ul className="nav nav-pills flex-column">
                        {render()}
                    </ul>
                </nav>

                <main className="col-sm-8 ml-sm-auto col-md-9 pt-3" role="main">
                    <Route path={`${match.url}/:processDefinitionId`} component={startForm}/>
                </main>
            </div>
        </div>
    )

};

const query = gql`
    query Query {
        processDefinitions(latest: true) {
            id,
            name
        }
    }
`;

export default graphql(query)(newProcess);

