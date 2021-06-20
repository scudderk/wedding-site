const jwt = require("jsonwebtoken");

var isAuth = function (req, res, next) {
  const authorisation = req.headers['authorization']
  if (!authorisation) {
    throw new Error('Not authenticated')
  }
  try {
    const token = authorisation.split(' ')[1]
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.payload = payload
    return next()
  } catch(err) {
    throw new Error('Not authenticated')
  }
}
module.exports = {
  isAuth,
};
