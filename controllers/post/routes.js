const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);
router.get("/search", controller.search);
router.get("/:id", controller.getById);
router.get("", controller.list);

module.exports = router;
