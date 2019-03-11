const router = require('express').Router();
const {
   serveConvenienceStores 
  } = require('./controllers');

/**
 * @swagger
 * /api/stores/convenience-stores:
 *   get:
 *     tags:
 *       - "Convenience Stores"
 *     description: "Get convenience stores location array"
 *     summary: "Get convenience stores location array"
 *     produces:
 *       - "application/json"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: "query"
 *         name: "name"
 *         schema: 
 *           type: "string"
 *           description: "the name of store(ex: CU, GS)"
 *           example: "CU"
 *       - in: "query"
 *         name: "region"
 *         schema: 
 *           type: "string"
 *           description: "the name of region(ex: CU, GS)"
 *           example: "서울특별시"
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
 *           description: "to for paging"
 *           example: 9
 *     responses:
 *       200:
 *         description: "success, Get convenience stores location array"
 *         schema:
 *           type: "object"
 *           properties:
 *             itmes: 
 *               type: "array"
 *               example: [
 *                 {
 *                   "name": "씨유심곡사거리",
 *                   "road_address": "경기도 부천시 장말로 319",
 *                   "latitude": 37.491085233564,
 *                   "longitude": 126.777498984336
 *                 }, {
 *                   "name": "GS25",
 *                   "road_address": "경기도 부천시 신상로 91",
 *                   "latitude": 37.4969697524481,
 *                   "longitude": 126.747468522353
 *                 }
 *               ]
 *               
 *
 */

router.get('/api/stores/convenience-stores', serveConvenienceStores);

module.exports = router;