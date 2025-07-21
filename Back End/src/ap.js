const express = require('express');
const routers = require("./routes/songs.routes")
const app = express();

app.use(express.json());


app.use('/',routers);

module.exports = app;