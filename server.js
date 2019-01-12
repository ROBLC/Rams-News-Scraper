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

//require("./routes/html-routes.js")(app);
require("./routes/article-routes")(app);
//require("./routes/comment-routes"(app));

mongoose.connect("mongodb://localhost/ramsNews", { useNewUrlParser: true });

app.get("/", function (req, res) {
    res.send("hi")
})




app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});