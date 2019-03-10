const path = require('path'); 
const router = require('express').Router();

const { serveJwt } = require(path.join(__dirname, 'controllers'));

router.post('/api/auth/login', serveJwt);

module.exports = router;