const express = require("express");
const mongoose = require("mongoose");

const exphbs = require("express-handlebars");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/article-routes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ramsNews"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});