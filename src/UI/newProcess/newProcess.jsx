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
                { processDefinitions.map(processDefinition => <NavLink key={processDefinition.id} activeClassName='active' className='list-group-item' to={`${match.url}/${processDefinition.id}`}>{processDefinition.name ? processDefinition.name : 'no name'}</NavLink>) }
            </div>
        );
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-5'>
                    {render()}
                </div>
                <div className="col-md-7">
                    <Route path={`${match.url}/:processDefinitionId`} component={startForm}/>
                </div>
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

