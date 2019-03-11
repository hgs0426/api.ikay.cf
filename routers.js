const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** 
 * @swagger 
 * openapi: 3.0.0
 * 
 * securityDefinitions:
 *   Bearer:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 *     description: |
 *       > For accessing the API a valid JWT token must be passed in all the requests in the 'Authorization' header. The following syntax must be used in the 'Authorization' header:
 *
 *       > ***Authorization: Bearer {JWT}***
 *     
 */

const auth = require(path.join(__dirname, 'api', 'auth', 'routers'));
const authMiddleware = require(path.join(__dirname, 'middlewares', 'auth'));
const convenienceStores = require('./api/stores/convenience-stores/routers');

router.use('/', auth);
router.use('/api', authMiddleware);
router.use('/', convenienceStores);

module.exports = router;