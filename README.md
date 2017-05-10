# camunda-graphql-tasklist

Showcase of a client app for [Camunda BPM GraphQL](https://github.com/camunda/camunda-bpm-graphql).

_Todo: add screenshot_

## Advantages 

- [GraphQL](graphql.org) and [GraphiQL](https://github.com/graphql/graphiql)<br> 
- freedom to choose the GUI library you prefer<br>
- get your JavaScript GUI (or node.js) professionals on Camunda BPM 
- easy to understand Camunda GraphQL API<br> 
- quick prototyping and development <br>

In this project we showcase the usage of [Apollo-Client](http://dev.apollodata.com/) and [React.js](https://facebook.github.io/react/)
## Installation

`yarn install`

## Setup
Create a file named `.env` in the project folder. <br>
Define your settings there (or start with a copy from `.env_example)`

Port of this client app: <br> 
`WEBPACK_DEV_SERVER_PORT=3000`

URL of your Camunda Server with deployed [camunda-bpm-graphql](https://github.com/camunda/camunda-bpm-graphql): <br>
`CAMUNDA_GRAPHQL_SERVER=http://localhost:8080/graphql/`


**Basic Authentication**<br>
Credentials of a Camunda BPM user to access the Camunda BPM GraphQL Server

LOGIN_NAME=demo <br>
LOGIN_PASSWORD=demo

Future update: Login via GUI


## Start client (Dev Server)
`yarn run dev` <br>

open http://localhost:3000 <br> 
or http://localhost:<WEBPACK_DEV_SERVER_PORT> <br>

## source code explained 
`index.html` and `index.jsx` - pretty much standard React.js with apollo-client<br>
`UI/Container.jsx` - defines basic page structure with a "Camunda Tasklist" navigation bar and a task container 
`UI/Tasks/Container.jsx` - defines left side menu "My Tasks" and "All Tasks", and the tasks (component List.jsx)
`UI/Tasks/List.jsx` - renders the list of tasks based on a GraphQL query 
`UI/Tasks/Task.jsx` - renders the details of a selected task based on a GraphQL query 

## custom forms
to be defined 