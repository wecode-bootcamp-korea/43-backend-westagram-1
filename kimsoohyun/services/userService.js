const userDao = require('../models/userDao')

const signUp = async (name, email, password, profileImage) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }
    const createUser = await userDao.createUser(
        name, email, password, profileImage
    );
    return createUser;
};

const list = async () => {
    const seeUsers = await userDao.seeUsers();
    return seeUsers;
}

const posts = async (userId) => {
    const seeUsersPosts = await userDao.seeUsersPosts(
        userId
    );
    return seeUsersPosts;
}

const likes = async (userId) => {
    const seeUsersLikes = await userDao.seeUsersLikes(
        userId
    );
    return seeUsersLikes;
}

const updateUser = async (name, email, password, profileImage, userId) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }
    const updateUser = await userDao.updateUser(
        name, email, password, profileImage, userId
    );
    return updateUser;
};

const updatePost = async (imageUrl, title, content, userId, postId) => {
    const updatePost = await userDao.updatePost(
        imageUrl, title, content, userId, postId);
    return updatePost;
};

const updateLike = async (postId, userId) => {
    const updateLike = await userDao.updateLike(
        postId, userId
    );
    return updateLike;
};

const deleteUser = async (userId) => {
    const deleteUser = await userDao.deleteUser(
        userId
    );
    return deleteUser;
}

const deletePost = async(userId, postId) => {
    const deletePost = await userDao. deletePost(
        userId, postId
    );
    return deletePost;
}

const deleteLike = async (userId) => {
    const deleteLike = await userDao.deleteLike(
        userId
    );
    return deleteLike;
}

module.exports = {signUp, list, posts, likes, updateUser, updatePost, updateLike, deleteUser, deletePost, deleteLike}

