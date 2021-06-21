const User = require("../models/login-model");
const bcrypto = require("bcryptjs");
const { createRefreshToken, createAccessToken } = require("../auth/auth");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { sendRefreshToken } = require("./sendRefreshToken");

login = (req, res) => {
  loginUser(req, res);
};
refresh_token = (req, res) => {
  const token = req.cookies.jid
  if (!token) {
    res.send({ ok: false, accessToken: '' })
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    res.send({ ok: false, accessToken: err})
  }
  const user = User.findOne({ id: payload.userId })
  if (!user) {
    res.send({ ok: false, accessToken: ''})
  }
  
  sendRefreshToken(res, createRefreshToken(user));
  return res.send({ ok: true, accessToken: createAccessToken(user) })
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
module.exports = {
  login,
  refresh_token
};