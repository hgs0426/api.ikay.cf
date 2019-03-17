const express = require('express');
const routers = require('./routers.js');
const path = require('path');
const { api } = require('./config.json');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST API for ikay.cf', // Title (required)
      version: '0.2.0', // Version (required)
    },
  },
  // host: 'localhost:8881',
  basePath: '/',
  // Path to the API docs
  apis: [
    `${path.join(__dirname, 'routers.js')}`,
    `${path.join(__dirname, 'api', 'auth', 'routers.js')}`,
    `${path.join(__dirname, 'api', 'stores', 'routers.js')}`,
    `${path.join(__dirname, 'api', 'stores', 'codes', 'routers.js')}`
  ],
};
 
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');  
  res.send(swaggerSpec);
});

app.use('/', routers);

app.listen(api.port, () => {
  console.log(`API Server listening on port ${api.port}!`)
});