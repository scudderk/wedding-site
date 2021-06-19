const jwt = require('jsonwebtoken')

const createAccessToken = (user) => {
	return jwt.sign(
		{ userId: user.Id },
		process.env.ENC_SECRET,
		{
		  expiresIn: "15m",
		}
	  );
}
const createRefreshToken = (user) => {
	return jwt.sign(
		{ userId: user.Id },
		process.env.ENC_COOKIE_SECRET,
		{
		  expiresIn: "7d",
		}
	  );
}
module.exports = {
	createAccessToken,
	createRefreshToken
  };