const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.post("", postController.createPost);
router.patch("", postController.modifyPost);
router.delete("/:postId", postController.deletePost);

module.exports = {
  router,
};
