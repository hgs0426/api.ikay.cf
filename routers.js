const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const convenienceStores = require('./api/stores/convenience-stores/routers');

router.use('/', convenienceStores);

module.exports = router;