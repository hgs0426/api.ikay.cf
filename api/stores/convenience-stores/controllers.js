const Database = require('../../../libs/Database'); 
const getConvenienceStoresFromDb = () => {
  return new Promise( async (resolve, reject) => {
    const client = new Database('stores');
    const sql = `SELECT * FROM convenience_stores`;
    try {
      const convenientStores = await client.query(sql);
      resolve(convenientStores);
    } catch (error) {
      reject(error);
    }
  });
};

const serveConvenienceStores = async (req, res) => {
  convenientStores = await getConvenienceStoresFromDb();
  setImmediate(()=> {
    res.json(convenientStores)
  });
};

module.exports = {
    serveConvenienceStores
  };