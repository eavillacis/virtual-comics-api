const crypto = require('crypto');
const request = require('request');

const { apiURL, publicKey, privateKey } = require('../config');

/**
 * Comics List.
 *
 * @returns {Object}
 */
exports.getComics = [
    function (req, res) {
        try {

            console.log(req.query);

            let ts = Date.now();
            let apiHash = crypto.createHash('md5').update(ts + privateKey + publicKey ).digest("hex");

            req.query.ts = ts;
            req.query.apikey = publicKey;
            req.query.hash = apiHash;

            request({
                uri: apiURL,
                qs: req.query
            }).pipe(res);
        } catch (e) {
            next(e);
        }
    }
];