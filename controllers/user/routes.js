const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("", controller.list);
router.get("/group", controller.groupBy);

module.exports = router;
