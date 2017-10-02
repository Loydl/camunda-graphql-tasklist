import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getProfile } from '../../utils/utils';
import { query as tasks } from './List';
import UmdLoader from '../../utils/UMDLoader';


class Task extends React.Component {

    getVariables(names) {
        const { taskVariablesQuery, taskQuery: { task }} = this.props;

        taskVariablesQuery.refetch({
            names,
            id: task.id
        })
    }

    submit(variables) {
        const { history, completeTask, taskQuery: { task }} = this.props;

        completeTask({
            variables: { taskId: task.id, variables},
            refetchQueries: [{
                query: tasks,
                variables: { assignee: null },
            }],
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/all`)
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        })
    }

    claimTask() {
        const { history, claimTask, taskQuery: { task }} = this.props;

        claimTask({
            variables: { taskId: task.id, userId: getProfile().username},
            refetchQueries: [{
                query: tasks,
                variables: { assignee: getProfile().username },
            }],
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/myTasks/${data.claimTask.id}`);
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        })
    }

    setVariables(variables) {
        if(variables){
            return variables.map(variable => {
                if(variable.valueType == 'object' || 'PrimitiveValueType[string]') {
                    return {value: JSON.parse(variable.value), valueType: variable.valueType, key: variable.key};
                } else {
                    return variable;
                }
            });
        } else {
           return [];
        }
    }

    render() {
        const { taskQuery: { loading, error, task }, taskVariablesQuery: { taskVariables }} = this.props;

        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <div className='container-fluid bg-light pt-3 pb-3 border rounded'>
                <h3>{task.name ? task.name : 'no name'}</h3>
                <h4>{task.processDefinition.name}</h4>
                <p>Assignee: <bold>{task.assignee ? task.assignee.id : <button onClick={this.claimTask.bind(this)} className='btn btn-default'>Claim</button>}</bold></p>
                <p>Form</p>
                <div className='container-fluid'>
                    { task.formKey ?
                        <UmdLoader url={`http://localhost:8080${task.contextPath}/${task.formKey}`} name={task.formKey.split('/').pop().split('.')[0]} props={{variables: this.setVariables(taskVariables), complete: this.submit.bind(this), fetchVariables: this.getVariables.bind(this)}}>
                            <p>loading form...</p>
                        </UmdLoader>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const taskQuery = gql`
    query Query($id: String!) {
        task(id: $id) {
            id
            name
            processDefinition {
                name
            }
            assignee {
                id
            }
            contextPath
            formKey
        }
    }
`;

const taskVariablesQuery = gql`
    query Query($id: String!, $names: [String]) {
        taskVariables(taskId: $id, names: $names) {
            key,
            value
            valueType
        }
    }
`;

const claimTask = gql`
    mutation Mutaion($taskId: String! $userId: String!) {
        claimTask(taskId: $taskId userId: $userId) {
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
    graphql(taskVariablesQuery, {
        name: "taskVariablesQuery",
        options: ({ match }) => ({
            variables: {
                id: match.params.taskId,
                names: []
            }
        })
    }),
    graphql(taskQuery, {
        name: "taskQuery",
        options: ({ match }) => ({
            variables: {
                id: match.params.taskId
            }
        })
    })
)(Task);