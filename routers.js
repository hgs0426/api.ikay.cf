const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const auth = require(path.join(__dirname, 'api', 'auth', 'routers'));
const authMiddleware = require(path.join(__dirname, 'middlewares', 'auth'));
const convenienceStores = require('./api/stores/convenience-stores/routers');

router.use('/', auth);
router.use('/api', authMiddleware);
router.use('/', convenienceStores);

module.exports = router;