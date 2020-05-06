const express = require("express");
const ComicsController = require("../controllers/comics");

const router = express.Router();

router.get("/", ComicsController.getComics);

module.exports = router;