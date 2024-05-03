const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/user/routes");
const postRoutes = require("../controllers/post/routes");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.use("/post", isLoggedIn, postRoutes);
router.use("/user",  userRoutes);

module.exports = router;
