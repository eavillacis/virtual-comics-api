const express = require("express");
const comicsRouter = require("./comics");

const app = express();

app.use("/comics/", comicsRouter);

module.exports = app;