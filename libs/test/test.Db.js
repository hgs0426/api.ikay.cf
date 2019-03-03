const chai = require('chai');
const Db = require('../Db');

describe('Db', function() {
  describe('isConnected', function() {
    it('should return over 0 if connected', async function() {
      const db = new Db('stores');
      const sql = 'SELECT COUNT(*) as cnt FROM convenience_stores';
      try {
        const result = await db.query(sql);
        // console.log(result);
        chai.assert.isAbove(result[0].cnt, 0, `cnt: ${result[0].cnt}`);
      } catch(error) {
        throw new Error(error);
      }
    });
  });
});