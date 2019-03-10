const jwt = require('jsonwebtoken');
const path = require('path');
const { auth } = require(path.join(__dirname, '..', 'config'));

const verifyJwt = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if ( undefined === authorization ) {
    res.status(403).json({
      error: 'token not exitst, please login'
    });
  } else {
    const token = authorization.split(' ')[1];
    jwt.verify(token, auth.secret, (err, decoded) => {
    if(err) {
        res.status(403).json({
        error: err
      });
    } else {
      req.decoded = decoded
      next();
    }
    });
  }

};

module.exports = verifyJwt;
