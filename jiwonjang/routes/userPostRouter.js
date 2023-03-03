const express = require("express");
const userPostController = require("../controllers/userPostController");

const router = express.Router();

router.get("", userPostController.usersPosts);

module.exports = {
  router,
};
