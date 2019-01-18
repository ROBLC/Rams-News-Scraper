var mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;