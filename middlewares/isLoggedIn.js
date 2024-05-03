const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../services/token.service");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.send({ message: "Please login" });
      throw new Error("You are not logged in"); // send a response and closed next
    }
    const data = await verifyToken(token);
    req.user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isLoggedIn;
