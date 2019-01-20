var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;