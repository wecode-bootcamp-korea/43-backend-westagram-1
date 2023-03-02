const likeDao = require('../models/likeDao')
const userDao = require("../models/userDao");

const create = async (userId, postId) => {
    const createLike = await likeDao.createLike(
        userId, postId);
    return createLike;
};

const list = async() => {
    const seeLikes = await likeDao.seeLikes();
    return seeLikes;
}

module.exports = {create, list}

