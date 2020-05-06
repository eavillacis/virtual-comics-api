var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
    res.json(["Status OK"]);
});

module.exports = router;