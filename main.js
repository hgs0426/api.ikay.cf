const express = require('express');
const cors = require('cors');

const routers = require('./routers.js');
const { backend, frontend } = require('./config.json');

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use('/', routers);

app.listen(backend.port, () => console.log(`Example app listening on port ${backend.port}!`))