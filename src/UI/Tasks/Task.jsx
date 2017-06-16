import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Form from 'react-jsonschema-form';
import _ from 'underscore';

const log = (type) => console.log.bind(console, type);

const template = (json, variables) => {
    return new Promise((resolve) => resolve(JSON.parse(JSON.stringify(json).replace(/\${(.*?)\}/g, (match, property) => {
        return _.findWhere(variables, {name: property}).value
    }))))
};


class Task extends React.Component {

    constructor() {
        super();

        this.state = {
            json: null
        }
    }

    componentDidMount() {
        const { data: { loading, task } } = this.props;
        if(!loading && task) fetch(`http://localhost:8080${task.contextPath}/${task.formKey}`)
            .then(res => res.json())
            .then(res => template(res, task.variables))
            .then(json => this.setState({ json }))
            .catch(err => console.log(err));
    }

    componentWillReceiveProps(nextProps) {
        const { data: { loading, task } } = nextProps;
        if(!loading && task) fetch(`http://localhost:8080${task.contextPath}/${task.formKey}`)
            .then(res => res.json())
            .then(res => template(res, task.variables))
            .then(json => this.setState({ json }))
            .catch(err => console.log(err));
    }

    completeTask(input) {
        const { history, completeTask, data: {task }} = this.props;

        const variables = Object.entries(input.formData).map(([key, value]) => {
            return { key, value }
        });

        completeTask({
            variables: { taskId: task.id, variables}
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/all`)
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        })
    }

    claimTask() {
        const { history, claimTask, data: {task }} = this.props;

        claimTask({
            variables: { taskId: task.id}
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/myTask/${data.claimTask.id}`);
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        })
    }

    render() {
        const { data: { loading, error, task }} = this.props;

        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>{task.name ? task.name : 'no name'}</div>
                <div className='panel-body'>
                    <h4>{task.processDefinition.name}</h4>
                    <p>Assignee: <bold>{task.assignee ? task.assignee.firstName : <button onClick={this.claimTask.bind(this)} className='btn btn-default'>Claim</button>}</bold></p>
                </div>
                <div className='container-fluid'>
                    <div className='panel panel-primary'>
                        <div className='panel-heading'>Form</div>
                        <div className='panel-body'>
                            { this.state.json ? <Form schema={this.state.json}
                                                      onChange={log("changed")}
                                                      onSubmit={this.completeTask.bind(this)}
                                                      onError={log("errors")} /> : "no form"}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const query = gql`
    query Query($id: String!) {
        task(id: $id) {
            id
            name
            processDefinition {
                name
            }
            assignee {
                firstName
            }
            formKey
            contextPath
            variables {
                name
                value
            }
        }
    }
`;

const claimTask = gql`
    mutation Mutaion($taskId: String!) {
        claimTask(taskId: $taskId userId: "demo") {
            id
            assignee {
                firstName
            }
        }
    }
`;

const completeTask = gql`
    mutation Mutaion($taskId: String!, $variables: [KeyValuePairInput]!) {
        completeTask(taskId: $taskId, variables: $variables) {
            id
        }
    }
`;

export default compose(
    graphql(claimTask, { name: 'claimTask' }),
    graphql(completeTask, { name: 'completeTask' }),
    graphql(query, {
        options: ({ match }) => ({
            variables: {
                id: match.params.taskId
            }
        })
    })
)(Task);