const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const AWSXRay = require('aws-xray-sdk');
const XRayExpress = AWSXRay.express;

const app = express();

app.use(XRayExpress.openSegment('virtualComics'));

const statusRouter = require("./routes");
const apiRouter = require("./routes/api");

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use('/', statusRouter);
app.use('/api/v1/', apiRouter);

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

app.use(XRayExpress.closeSegment());

module.exports.lambdaHandler = serverless(app);