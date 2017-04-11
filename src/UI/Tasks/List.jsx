import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Link } from 'react-router-dom';

import Task from './Task';

const List = ({ match, data: { loading, tasks, error } }) => {

    function render() {
        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <ul className='list-group'>
                { tasks.map(task => <li className='list-group-item' key={task.id}><Link to={`${match.url}/${task.id}`}>{task.name ? task.name : 'no name'}</Link></li>) }
            </ul>
        );
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                { render() }
            </div>
            <div className='col-md-7'>
                <Route path={`${match.url}/:taskId`} component={Task}/>
            </div>
        </div>
    )
};

const query = gql`
    query Query($assignee: String) {
        tasks(assignee: $assignee) {
            id
            name
        }
    }
`;

export default graphql(query, {
    options: ({ match }) => ({
        variables: {
            assignee: match.params.userId === "all" ? null : match.params.userId
        }
    })
})(List);