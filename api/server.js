const express = require("express");

const newRouter = require("../api/newRouter.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', newRouter);

server.get('/', (req, res) =>{
    res.send(`<h1>Server starting.....</h1>`)
})

module.exports = server;
