const User = require("../models/login-model");
const bcrypto = require("bcryptjs");
const { createRefreshToken, createAccessToken } = require("../auth/auth");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { sendRefreshToken } = require("./sendRefreshToken");

login = (req, res) => {
  loginUser(req, res);
};
logOut = (req, res) => {
  sendRefreshToken(res,'');
  return res.send({ ok: true, success: true })
};
refresh_token = (req, res) => {
  const token = req.cookies.jid
  if (!token) {
    return res.send({ ok: false, accessToken: '' })
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    return res.send({ ok: false, accessToken: err})
  }
  User.findOne({ _id: payload.userId })
  .then((user) => {
    if (!user) {
      return res.send({ ok: false, accessToken: ''})
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: ''})
    }
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) })  
  })
};
revokeRefreshTokenForUser = (req, res) => {
  const userId = req.body.userId
  try {
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      user.tokenVersion = user.tokenVersion++
      user
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              error: 'User updated',
            });
          })
          .catch(error => {
            return res.status(404).json({
              success: false,
              error: 'User not updated',
            });
          })
  })

    return true
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
}

async function loginUser(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide login credentials',
    });
  }
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    return user;
  })
  .then((data) => {
    bcrypto.compare(req.body.password, data.password)
    .then((valid) => {
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: 'Invalid login, either the username or password is incorrect',
        });
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
module.exports = {
  login,
  logOut,
  refresh_token,
  revokeRefreshTokenForUser
};