const crypto = require('crypto');
const request = require('request');
const AWSXRay = require('aws-xray-sdk');
const qs = require('qs');

const tracedHttp = AWSXRay.captureHTTPs(require('https'));

const { apiURL, publicKey, privateKey } = require('../config');

/**
 * Comics List.
 *
 * @returns {Object}
 */
exports.getComics = [
    function (req, res, next) {

        const segment = AWSXRay.getSegment();
        segment.addAnnotation('segment', 'get star wars comics');

        try {
            console.log(req.query);

            let ts = Date.now();
            let apiHash = crypto.createHash('md5').update(ts + privateKey + publicKey ).digest("hex");

            req.query.ts = ts;
            req.query.apikey = publicKey;
            req.query.hash = apiHash;

            const host = apiURL;

            AWSXRay.captureAsyncFunc('send', function(subsegment) {
                sendRequest(host, req.query, function(result) {
                    res.json(result);
                    subsegment.close();
                });
            });

            // request({
            //     uri: apiURL,
            //     qs: req.query
            // }).pipe(res);
        } catch (e) {
            next(e);
        }
    }
];

function sendRequest(host, query, cb) {
    const options = {
        host: host,
        path: '/v1/public/series/19242/comics?' + qs.stringify(query),
        port: 443
    };

    const callback = function(response) {
        let str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            cb(JSON.parse(str));
        });
    };

    tracedHttp.request(options, callback).end();
}