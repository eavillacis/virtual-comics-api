const express = require("express");
const AWSXRay = require('aws-xray-sdk');

const app = express();
const router = express.Router();

router.get("/", function(req, res) {
    const segment = AWSXRay.getSegment();
    segment.addAnnotation('segment', 'index');

    res.json(["Status OK"]);
});

module.exports = router;