const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

module.exports = function(app) {
    app.set("json spaces", 4);
    app.use(cors());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        if (req.body && req.body.id) {
            delete req.body.id;
        }
        next();
    });
    app.use(express.static("public"));
}