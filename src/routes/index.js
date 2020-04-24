const express = require('express');
const request = require('request');
const crypto = require('crypto');

const { apiURL, publicKey, privateKey } = require('../config');

const router = express.Router();

const getStatus = async (req, res, next) => {
    res.json(["Status OK"]);
};
router
    .route('/')
    .get(getStatus);

const getComics = async (req, res, next) => {
    try {
        let ts = Date.now();
        let apiHash = crypto.createHash('md5').update(ts + privateKey + publicKey ).digest("hex");

       request({
            uri: apiURL,
            qs: {
                ts: ts,
                apikey: publicKey,
                hash: apiHash
            }
        }).pipe(res);
    } catch (e) {
        next(e);
    }
};

router
    .route('/api/v1/comics')
    .get(getComics);

module.exports = router;