const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content, userId, postsImg } = req.body;

    if (!title || !userId || !postsImg) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPost(title, content, userId, postsImg);
    return res.status(201).json({
      message: "POST_CREATED",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const changeModifyPost = async (req, res) => {
  try {
    const { postingId, postingTitle, postingContent } = req.body;

    if (!postingId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const changeModifyPost = await postService.changeModifyPost(
      postingId,
      postingTitle,
      postingContent
    );
    return res.status(200).json({
      data: changeModifyPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const changeDeletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.changeDeletePost(postId);
    return res.status(200).json({
      message: "POST_DELETED",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  changeModifyPost,
  changeDeletePost,
};
