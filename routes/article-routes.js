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


                }
                db.Article.create(result).then(dbArticle => {
                    console.log(dbArticle);
                }).catch(err => console.log(err));
            })

        });
        res.send("scrape complete")
    });
};

