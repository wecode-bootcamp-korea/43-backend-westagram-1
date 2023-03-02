const express = require("express");
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/create', likeController.create);
router.get('/list', likeController.list);

module.exports = {router};

