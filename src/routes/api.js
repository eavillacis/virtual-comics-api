const express = require("express");
const comicsRouter = require("./comics");
const winesRouter = require("./wines");

const app = express();

app.use("/comics/", comicsRouter);
app.use("/wines/", winesRouter);

module.exports = app;