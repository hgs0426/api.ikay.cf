const path = require('path');
const router = require('express').Router();

const { serveCodes } = require(path.join(__dirname, 'controllers'));

/**
 * @swagger
 * /api/stores/codes/{type}/names/{name}:
 *   get:
 *     tags:
 *       - "Store"
 *     description: "Get codes to query data"
 *     summary: "Get codes to query data"
 *     produces:
 *       - "application/json"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: "path"
 *         name: "type"
 *         required: true
 *         schema: 
 *           type: "string"
 *           description: " code(ex: city, store)"
 *           example: "store"
 *       - in: "path"
 *         name: "name"
 *         required: false
 *         schema: 
 *           type: "string"
 *           description: " name(ex: 서울, 편의점)"
 *           example: "편의점"
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


router.get('/api/stores/codes/:type/names/:name', serveCodes);

module.exports = router;