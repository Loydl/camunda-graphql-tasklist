import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, NavLink } from 'react-router-dom';
import moment from 'moment';

import Task from './Task';

//@todo highlight selected task

const List = ({ match, data: { loading, tasks, error } }) => {

    function sortTasks(tasks) {
        return tasks.sort((a, b) => moment(b.createTime, 'ddd MMM DD HH:mm:ss Z YYYY') - moment(a.createTime, 'ddd MMM DD HH:mm:ss Z YYYY'))
    }

    function render() {
        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <div className='list-group'>
                { sortTasks([...tasks]).map(task => <NavLink key={task.id} activeClassName='active' className='list-group-item' to={`${match.url}/${task.id}`}>{task.name ? task.name : 'no name'}<b className='pull-right'>{ moment(task.createTime, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow()}</b></NavLink>) }
            </div>
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
            createTime
        }
    }
`;

export { query };

export default graphql(query, {
    options: ({ match }) => ({
        variables: {
            assignee: match.params.userId === 'myTasks' ? 'demo' : null
        },
        forceFetch: true
    })
})(List);