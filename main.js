const express = require('express');
const routers = require('./routers.js');
const { api } = require('./config.json');

const app = express();
app.use('/', routers);

app.listen(api.port, () => {
  console.log(`API Server listening on port ${api.port}!`)
});