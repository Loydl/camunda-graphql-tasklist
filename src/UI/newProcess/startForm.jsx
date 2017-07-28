import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { query as tasks } from '../Tasks/List';
import UmdLoader from 'react-umd-loader';



class startForm extends React.Component {

    createProcessInstanceWithVariables(variables) {
        const { history, createProcessInstance, data: { processDefinition }} = this.props;
        console.log(processDefinition)

        createProcessInstance({
            variables: { key: processDefinition.key, variables},
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

    createProcessInstance() {
        const { history, createProcessInstance, data: { processDefinition }} = this.props;

        createProcessInstance({
            variables: { key: processDefinition.key},
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



    render() {
        const { data: { loading, error, processDefinition }} = this.props;

        if(loading) return <p>loading...</p>;
        if(error) return <div className="alert alert-danger" role="alert">{error.message}</div>;

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>{processDefinition.name ? processDefinition.name : 'no name'}</div>
                <div className='panel-body'>
                    <h4>{processDefinition.versionTag}</h4>
                    <p>{processDefinition.description}</p>
                </div>
                <div className='container-fluid'>
                    <div className='panel panel-primary'>
                        <div className='panel-heading'>Form</div>
                        <div className='panel-body'>
                            {  processDefinition.startFormKey ?
                                <UmdLoader url={`http://localhost:8080${processDefinition.contextPath}/${processDefinition.startFormKey}`} name="lib" props={{ submit: this.createProcessInstanceWithVariables.bind(this) }}>
                                    <p>loading form...</p>
                                </UmdLoader>
                                :
                                null
                            }
                            { !processDefinition.startFormKey ? <button className='btn btn-default' onClick={this.createProcessInstance.bind(this)}>create</button> : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const query = gql`
    query Query($id: String!) {
        processDefinition(id: $id) {
            name
            id
            isSuspended
            startFormKey
            description
            versionTag
            key
            contextPath
        }
    }
`;

const createProcessInstance = gql`
    mutation Mutaion($key: String!, $variables: [KeyValuePairInput]) {
        createProcessInstance(processDefintionKey: $key, variables: $variables) {
            id
        }
    }
`;

export default compose(
    graphql(createProcessInstance, { name: 'createProcessInstance'}),
    graphql(query, {
        options: ({ match }) => ({
            variables: {
                id: match.params.processDefinitionId
            }
        })
    })
)(startForm);