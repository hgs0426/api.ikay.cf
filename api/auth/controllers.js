const jwt = require('jsonwebtoken');
const path = require('path');
const { auth } = require(path.join(__dirname, '..', '..', 'config'));
const Database = require(path.join(__dirname, '..', '..', 'libs', 'Database'));

const issueJwt = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId: userId
      }, 
      auth.secret, 
      {
        expiresIn: auth.expiresIn, 
        issuer: 'ikay',
        subject: 'user' 
      },
      (err, token) => {
        if (err) {
          reject(err);
        } 
        resolve(token);
      }
    );
  });
};

const userInfoFromDb = (userId) => {
  return new Promise ( async (resolve, reject) => {
    const client = new Database('ikay');
    const sql = `SELECT user_sn, user_id, pswd, permission
                 FROM user_info
                 WHERE user_id like '${userId}'`;
    try {
      const userInfo = await client.query(sql);
      // console.log(userInfo[0]);
      resolve(userInfo[0]); 
    } catch (error) {
      reject(error);
    }
  });
};

const validateUserInfo = async (userId, pswd) => {
  try {
    const userInfo = await userInfoFromDb(userId);
    return  userInfo.user_id === userId && userInfo.pswd === pswd ? true : false ;
  } catch (error) {
    throw new Error(error);
  }
};

const serveJwt = async (req, res) => {
  const { userId, pswd } = req.body;

  const respond = (res, jwt) => {
    res.status(200).json({
      jwt: jwt
    });
  };

  const onError = (res) => {
    res.status(401).json({
      error: 'invalid userId or pswd'
    });
  };

  if( await validateUserInfo(userId, pswd) ) {
    const jwt = await issueJwt(userId);
    respond(res, jwt);
  } else {
    onError(res);
  }
}

module.exports = {
  serveJwt
};