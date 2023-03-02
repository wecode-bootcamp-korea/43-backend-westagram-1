const postDao = require('../models/postDao')
const userDao = require("../models/userDao");

const create = async (imageUrl, title, content, userId) => {
    const createPost = await postDao.createPost(
        imageUrl, title, content, userId
    );
    return createPost;
};

const list = async () => {
    const seePosts = await postDao.seePosts();
    return seePosts;
}

module.exports = {create, list}