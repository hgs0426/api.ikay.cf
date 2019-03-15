const path = require('path');
const Database = require(path.join(__dirname, '../', '../', 'libs', 'Database'));

const limit = (queries) => {
  let conditions = '';
  if (queries.from && queries.to) {
    conditions += `LIMIT ${queries.from}, ${queries.to} `;
  }
  if (!queries.from && queries.to) {
    conditions += `LIMIT ${queries.to} `;
  }
  return conditions;
}

const cityConditions = (_cityCodes) => {
  const sentence = `AND city_code in (${_cityCodes}) `;
  console.log(sentence);
  return sentence;
};

const whereConditions = (queries) => {
  let sentences = ''; 
  const storeCode = queries.storeCode;
  const cityCodes = queries.cityCodes;
  sentences += `WHERE c.code LIKE '${storeCode}' `;

  if (cityCodes) {
    sentences += `${cityConditions(cityCodes)} `;  
  }
  return sentences;
};

const getStoresFromDb = (queries) => {
  return new Promise(async (resolve, reject) => {
    const client = new Database('stores');
    const sql = `SELECT st.no, st.name, c.code, st.road_address, st.latitude, st.longitude
                FROM commerce_code3 c LEFT JOIN stores201809 st
                ON c.code = st.commerce_code3 
                ${whereConditions(queries)}
                ${limit(queries)}`;

    console.log(sql);
    try {
      const stores = await client.query(sql);
      resolve(stores);
    } catch (error) {
      reject(error);
    }
  });
};

const serveStores = async (req, res) => {
  const queries = {
    storeCode: req.params.storeCode,
    cityCodes: req.query.cityCodes,
    from: req.query.from,
    to: req.query.to
  };
  console.log(queries);

  if(!queries.storeCode) {
    res.status(400).json({
      message: 'storeCode is null'
    });
  }

  try {
    stores = await getStoresFromDb(queries);
    res.json(stores);
  } catch (error) {
    res.status(500).json({error: error});
  }
  
};

module.exports = {
  serveStores
};