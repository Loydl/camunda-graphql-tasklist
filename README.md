camunda-graphql-tasklist
========================

A Tasklist using [GraphQL](https://github.com/camunda/camunda-bpm-graphql) to communicate with the Camunda BPM Server. <br>

## Client Technology
- [Apollo-Client](http://dev.apollodata.com/) <br>
- [React.js](https://facebook.github.io/react/)

## Installation

`yarn install`

## Setup
Create a file named `.env` in the project folder. <br>
Define your settings there (or start with a copy from `.env_example)`

Port of this client app: <br> 
`WEBPACK_DEV_SERVER_PORT=3000`

URL of your Camunda Server with deployed [camunda-bpm-graphql](https://github.com/camunda/camunda-bpm-graphql): <br>
`CAMUNDA_GRAPHQL_SERVER=http://localhost:8080/graphql/`

JWT Provider: <br>
`JWTAuthProvider=http://localhost:8080/auth/jwt` <br>
(please check JWT installation instructions at https://github.com/camunda/camunda-bpm-graphql#jwt-json-web-token-authentication)

## Start client (Dev Server)
`yarn run dev` <br>

open `http://localhost:<WEBPACK_DEV_SERVER_PORT>` <br> 
e.g. http://localhost:3000 <br>

## source code explained 
`index.html` and `index.jsx` - pretty much standard React.js with apollo-client<br>
`UI/Container.jsx` - defines basic page structure with a "Camunda Tasklist" navigation bar and a task container 
`UI/Tasks/Container.jsx` - defines left side menu "My Tasks" and "All Tasks", and the tasks (component List.jsx)
`UI/Tasks/List.jsx` - renders the list of tasks based on a GraphQL query 
`UI/Tasks/Task.jsx` - renders the details of a selected task based on a GraphQL query 

## custom forms
are defined in the Camunda Process Application