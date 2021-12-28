# Getting Started with ShopBridge App

ShopBridge is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to run development server

### 1. `npm i`

This will install all the node_modules required.

### 2. `./node_modules/.bin/json-server --port 3001 --watch db.json`

To start local json-server on port 3001, which is used as a mock server.

### 3. `npm start`

To start the development server, from here you can start surfing through the app.

`http://localhost:3000/`

### 4. `npm test -- --coverage`

To test the coverage of all components.
Will fail if the `Step 2` is not done as testing is done against mock server data.
