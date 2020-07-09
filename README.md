# Sneake Chat App

Web app of a chat created with React and socket.oi.

![enter image description here](https://raw.githubusercontent.com/iammateus/sneake-chat-app/assets/demo.png)
## Requeriments
This project has a few dependencies that you need to install.
|  Method | Dependencies |
|--|--|
| Docker | [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) |
| Without Docker | [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)|

 ## Installation
Using Docker 

    $ docker-compose up
or

    $ yarn install
or

    $ npm install
To start without docker: yarn/npm start

 ## Environment Variables
 A list of required environment variables that you need to set in the .env file:
| Name | Value |
|--|--|
| REACT_APP_CHAT_SERVER | The URL and port of the [back end application](https://github.com/iammateus/sneake-chat) Ex:. http://localhost:5000 |
