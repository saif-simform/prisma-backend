const jwt = require("jsonwebtoken");
const moment = require("moment");
const CONFIG = require("../config/config");

const generateToken = (userId) => {
  const accessTokenExpires = moment().add(
    CONFIG.JWT.accessExpirationMinutes,
    "minutes"
  );

  return jwt.sign({ userId: userId }, CONFIG.JWT.secret, {
    expiresIn: accessTokenExpires.unix(),
  });
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, CONFIG.JWT.secret);
  return payload;
};

const cookieToken = (user, res) => {
  const token = generateToken(user.id);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;
  res.status(200).cookie("token", token, options).send({
    success: true,
    token,
    user,
  });
};

module.exports = { generateToken, cookieToken, verifyToken };
