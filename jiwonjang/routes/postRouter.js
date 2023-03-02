const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.post("", postController.createPost);
router.patch("", postController.changeModifyPost);
router.delete("/:postId", postController.changeDeletePost);

module.exports = {
  router,
};
