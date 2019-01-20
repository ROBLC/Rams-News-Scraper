var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", (req, res) => {
        axios.get("https://www.therams.com/news/").then(response => {

            const $ = cheerio.load(response.data)

            $(".d3-l-col__col-4 ").each(function (i, element) {
                const result = {};
                if ($(this).find(".d3-o-media-object").attr("title") && $(this).find(".d3-o-media-object").attr("href")) {
                    result.title = $(this).find(".d3-o-media-object").attr("title");
                    result.link = ("https://www.therams.com" + $(this).find(".d3-o-media-object").attr("href"));
                    result.summary = $(this).find(".d3-o-media-object__summary").text().trim();
                    result.date = $(this).find(".d3-o-media-object__date").text().trim();



                }
                db.Article.create(result).then(dbArticle => {
                    console.log(dbArticle);
                }).catch(err => console.log(err));
            })

        });
        res.send("scrape complete")
    });
    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {

            res.json(dbArticle);
        }).catch(function (err) {

            res.json(err);
        });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("comments")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });
    app.post("/comments", function (req, res) {
        db.Comment.create({ body: req.body.body }).then(function (dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.body._id }, { $push: { comments: dbComment._id } }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    })

    app.delete("/comments/:id", function (req, res) {
        db.Comment.findByIdAndRemove(req.params.id).then(function (dbComment) {
            res.json(dbComment)
        }).catch(function (err) {
            res.json(err);
        });
    })


    app.get("/comments", function (req, res) {
        db.Comment.find(comment).then(
            res.json(comment)
        ).catch(function (err) {

            res.json(err);
        });
    });

};

