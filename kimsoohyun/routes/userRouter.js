const express = require("express");
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/list', userController.list);
router.get('/:userId/posts', userController.posts);
router.get('/:userId/likes', userController.likes);
router.put('/:userId', userController.updateUser);
router.put('/:userId/post/:postId', userController.updatePost);
router.put('/:userId/likes', userController.updateLike);
router.delete('/:userId', userController.deleteUser);
router.delete('/:userId/post/:postId', userController.deletePost);
router.delete('/:userId/likes', userController.deleteLike);

module.exports = {router};

