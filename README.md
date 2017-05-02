# camunda-graphql-tasklist

Showcase of a client app for [Camunda BPM GraphQL](https://github.com/camunda/camunda-bpm-graphql).

## Advantages 

- [GraphQL](graphql.org)<br> 
- freedom to choose the GUI library you prefer<br>
- get your JavaScript GUI (or node.js) professionals on Camunda BPM 
- easy to understand Camunda GraphQL API<br> 
- quick prototyping and development <br>

In this project we showcase the usage of [React.js](https://facebook.github.io/react/)
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


## Start client (Dev Server)
`yarn run dev` <br>

open http://localhost:3000 <br> 
or http://localhost:<WEBPACK_DEV_SERVER_PORT> <br>

## explain code 
Todo...