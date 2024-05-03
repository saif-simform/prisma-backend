require("dotenv").config();

const CONFIG = {
  app: process.env.APP || "local",
  port: process.env.PORT || "3001",

  JWT: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  },
};

module.exports = CONFIG;
