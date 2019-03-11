const path = require('path'); 
const router = require('express').Router();

const { serveJwt } = require(path.join(__dirname, 'controllers'));
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - "Auth"
 *     description: "Get a jwt"
 *     summary: "Get a jwt"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "user login ID, Password to get a jwt"
 *         required: true 
 *         schema: 
 *           type: "object"
 *           properties:
 *             userId:
 *               type: "string"
 *               example: "test"
 *             pswd:
 *               type: "string"
 *               example: "test1234"
 *     responses:
 *       200:
 *         description: "success get jwt"
 *         schema: 
 *           type: "object"
 *           properties:
 *             jwt:
 *               type: "string"
 *               example: "xxxxxxx.yyyyyy.zzzzzz"
 *               
 */
router.post('/api/auth/login', serveJwt);

module.exports = router;