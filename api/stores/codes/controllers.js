const path = require('path');
const Database = require(path.join(__dirname, '../', '../', '../', 'libs', 'Database'));

const checkNameLength = (name) => {
  return name.length < 2? false: true; 
};

const addWhereCondition = (name) => {
  let where = '';

  if (name && '{name}' !== name) {
    where += `WHERE name like '%${name}%'`;
  }
  return where;
};

const table = (type) => {
  switch (type) {
    case 'store':
      return 'commerce_code3';

    case 'city':
      return 'city_code';
  }
};

const getCodesFromDb = (type, name) => {
  return new Promise( async (resolve, reject) => {
    const client = new Database('stores');
    if ( !checkNameLength(name) ) {
      reject({
        statusCode: 400,
        message: 'name lenth should be greater than 1'
      });
    }
    const sql = `SELECT code, name
                FROM ${table(type)}
                ${addWhereCondition(name)}`;
    // console.log(sql);
    try {
      const codes = await client.query(sql);
      resolve({
        statusCode: 200,
        rows: codes
      });
    } catch (error) {
      reject({
        statusCode: 500,
        message: error
      });
    }
  });
};

const serveCodes = async (req, res) => {

  const type = req.params.type;
  const name = req.params.name;
  // console.log(type, name);
  try {
    const results = await getCodesFromDb(type, name);
    res.status(results.statusCode).json(results.rows);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }

};

module.exports = {
  serveCodes
};