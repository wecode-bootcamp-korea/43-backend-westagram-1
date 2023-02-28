const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.post("/posts", postController.createPost);
router.patch("/posts", postController.changeModifyPost);
router.delete("/posts/:postId", postController.changeDeletePost);

module.exports = {
  router,
};
