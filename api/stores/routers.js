const path = require('path');
const router = require('express').Router();

const { serveStores } = require(path.join(__dirname, 'controllers'));

/**
 * @swagger
 * /api/stores/{storeCode}:
 *   get:
 *     tags:
 *       - "Store"
 *     description: "Get Store's Location As Array"
 *     summary: "Store's Location As Array"
 *     produces:
 *       - "application/json"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: "path"
 *         name: "storeCode"
 *         required: true
 *         schema: 
 *           type: "string"
 *           description: "store's code(ex: Q02A00)"
 *           example: "Q02A00"
 *       - in: "query"
 *         name: "cityCode"
 *         schema: 
 *           type: "string"
 *           description: "code of city. append comma between codes on getting multiple data. (ex: 41,50,11)"
 *           example: "41,50,11"
 *       - in: "query"
 *         name: "from"
 *         schema: 
 *           type: "number"
 *           description: "from for paging"
 *           example: 0
 *       - in: "query"
 *         name: "to"
 *         schema: 
 *           type: "number"
 *           description: "to for paging. It will be added 1 because to check having next page."
 *           example: 9
 *     responses:
 *       200:
 *         description: "success, Get stores location array"
 *         schema:
 *           type: "object"
 *           properties:
 *             itmes: 
 *               type: "array"
 *               example: [
 *                  {
 *                    "no": 2906236,
 *                    "name": "강동반점",
 *                    "code": "Q02A00",
 *                    "road_address": "경상북도 구미시 인동20길 43-3",
 *                    "latitude": 36.095417480004,
 *                    "longitude": 128.423909843665
 *                 },
 *                 {
 *                    "no": 2920198,
 *                    "name": "용궁",
 *                    "code": "Q02A00",
 *                    "road_address": "경기도 안산시 단원구 와동공원로 163",
 *                     "latitude": 37.3461469114556,
 *                    "longitude": 126.821408779732
 *                 }
 *              ]
 *               
 *
 */



router.get('/api/stores/:storeCode', serveStores);

module.exports = router;