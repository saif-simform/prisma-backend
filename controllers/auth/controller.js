// Bring in prisma and cookie

const prisma = require("../../prisma/index");
const { cookieToken } = require("../../services/token.service");

// user signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("body", req.body);
    console.log("body", name, email, password);

    // Check
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // send token to user
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // Find user based on email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //check user
    if (!user) {
      throw new Error("User not found");
    }

    // Password mismatch
    if (user.password !== password) {
      throw new Error("password is incorrect");
    }

    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// logout user

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).send({ success: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { signup, login, logout };
