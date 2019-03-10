const Database = require('../../../libs/Database'); 

const setLimitConditions = (query) => {
  let conditions = '';
  if (query.from && query.to) {
    conditions += `LIMIT ${query.from}, ${query.to} `;
  }
  if (!query.from && query.to) {
    conditions += `LIMIT ${query.to} `;
  }
  return conditions;
}

const setWhereConditions = (query) => {
  let conditions;
  conditions = '';
  if (query.name) {
    conditions += `WHERE name like "%${query.name}%" `;
  }

  if (query.region) {
    conditions += `AND road_address like "%${query.region}%" `;
  }
  return conditions;
};

const getConvenienceStoresFromDb = (where, limit) => {
  return new Promise( async (resolve, reject) => {
    const client = new Database('stores');
    const sql = `SELECT name, road_address, latitude, longitude
                 FROM convenience_stores
                 ${where}
                 ${limit}`;
    // console.log(sql);
    try {
      const convenientStores = await client.query(sql);
      resolve(convenientStores);
    } catch (error) {
      reject(error);
    }
  });
};

const serveConvenienceStores = async (req, res) => {
  const where = setWhereConditions(req.query);
  const limit = setLimitConditions(req.query)
  convenientStores = await getConvenienceStoresFromDb(where, limit);
  res.json(convenientStores)
};

module.exports = {
  serveConvenienceStores
};