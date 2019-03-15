const path = require('path');
const router = require('express').Router();

const { serveStores } = require(path.join(__dirname, 'controllers'));

router.get('/api/stores/:storeCode', serveStores);

module.exports = router;