const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use('/', require(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    console.log('TEST CHANGE 1');
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

module.exports.lambdaHandler = serverless(app);