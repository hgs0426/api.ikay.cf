const router = require('express').Router();
const {
   serveConvenienceStores 
  } = require('./controllers');

router.get('/api/stores/convenience-stores', serveConvenienceStores);

module.exports = router;