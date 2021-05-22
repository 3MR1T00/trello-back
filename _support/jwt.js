const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = { signToken, verifyToken };


function signToken (user) {
    accessToken = jwt.sign({user}, config.secret, {expiresIn: '7d'});
    return {...user, accessToken};
}


function verifyToken (token) {
   return jwt.verify(token, config.secret, function (err, result) {
        if (err) return err; 
        return result;
   });
}
