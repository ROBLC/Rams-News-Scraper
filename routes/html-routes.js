var db = require("../models");

module.exports = function (app) {
    app.get("/hi", function (req, res) {
        res.send("hi")
    })
    app.get("/", function (req, res) {
        res.render("index")
    })
}