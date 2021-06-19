const User = require("../models/login-model");
const bcrypto = require("bcryptjs");
const { createRefreshToken, createAccessToken } = require("../auth/auth");
require('dotenv').config()

login = (req, res) => {
  loginUser(req, res);
};
module.exports = {
  login,
};
async function loginUser(req, res) {
  const body = req.body;
  if (!body) {
    return returnResult(400, false, "You must provide login credentials")
  }
  const user = User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return returnResult(400, false, err)
    }
    if (!user) {
      return returnResult(404, false, `User not found`)
    }
    return user;
  })
    .then((data) => {
      bcrypto.compare(req.body.password, data.password).then((valid) => {
        if (!valid) {
          return returnResult(400, false, `Invalid login, either the username or password is incorrect`)
        }
        res.cookie(
          "jid",
          createRefreshToken(data),
          {
            httpOnly: true
          }
        )
        const accessToken = createAccessToken(data);
        return res.status(201).json({
          success: true,
          token: accessToken,
          message: "Login successful!",
        });
      });
    })
    .catch((err) => console.log(err));
}
async function returnResult(statusCode, suc, msg) {
  return res.status(statusCode).json({
    success: suc,
    error: msg,
  });
}