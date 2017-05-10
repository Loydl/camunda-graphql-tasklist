import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Form1 extends React.Component {
    constructor() {
      super();

      this.state = {
          input: ""
      };
    }

    onClick(e) {
        const { mutate, taskId } = this.props;
        e.preventDefault();

        mutate({
            variables: { taskId, input: this.state.input }
        })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
            console.log('there was an error sending the query', error);
        });
    }

    render() {
        return (
            <form>
                <input type="number" className="form-control" onChange={(e) => this.setState({input: e.target.value})}/>
                <button className="btn btn-default" onClick={this.onClick.bind(this)}>complete task</button>
            </form>
        )
    }
}

const mutation = gql`
    mutation Mutaion($input: String!, $taskId: String!) {
        completeTask(
            taskId: $taskId
            variables: [{key: "number", value: $input}]
        ) {
            id
        }
    }
`;

export default graphql(mutation)(Form1);