const express = require("express");
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/create', postController.create);
router.get('/list', postController.list);

module.exports = {router};

