const express = require("express");
const WinesController = require("../controllers/wines");

const router = express.Router();

router.get("/", WinesController.getWines);

module.exports = router;