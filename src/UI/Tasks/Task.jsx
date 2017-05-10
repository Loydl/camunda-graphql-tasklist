import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Route } from 'react-router-dom';
import Form1 from '../Forms/form1';


class Task extends React.Component {

    componentDidMount() {
        const { match, history, data: { loading, task }} = this.props;

        if(!loading && task) history.push(`${match.url}/${task.formKey}`)
    }

    claimTask() {
        const { history, mutate, data: {task }} = this.props;

        mutate({
            variables: { taskId: task.id}
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/demo/${data.claimTask.id}`);
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        })
    }

    render() {
        const { match, data: { loading, error, task }} = this.props;

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
                            <Route path={`${match.url}/form1`} render={() => (<Form1 taskId={task.id}/>)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


/*const Task = ({ match, history, mutate, data: { loading, task, error } }) => {
    function claimTask() {
        mutate({
            variables: { taskId: task.id}
        })
            .then(({ data }) => {
                console.log(data);
                history.push(`/tasks/demo/${data.claimTask.id}`);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            })
    }

    function render() {
        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        if(!loading) history.push(`${match.url}/${task.formKey}`)

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>{task.name ? task.name : 'no name'}</div>
                <div className='panel-body'>
                    <h4>{task.processDefinition.name}</h4>
                    <p>Assignee: <bold>{task.assignee ? task.assignee.firstName : <button onClick={claimTask.bind(this)} className='btn btn-default'>Claim</button>}</bold></p>
                </div>
                <div className='container-fluid'>
                    <div className='panel panel-primary'>
                        <div className='panel-heading'>Form</div>
                        <div className='panel-body'>
                            <Route path={`${match.url}/form1`} component={form1} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return render();
};*/

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
        }
    }
`;

const mutation = gql`
    mutation Mutaion($taskId: String!) {
        claimTask(taskId: $taskId userId: "demo") {
            id
            assignee {
                firstName
            }
        }
    }
`;

export default compose(
    graphql(mutation),
    graphql(query, {
        options: ({ match }) => ({
            variables: {
                id: match.params.taskId
            }
        })
    })
)(Task);