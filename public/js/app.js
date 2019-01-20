$(document).ready(() => {
    const articleContainer = $("#articleContainer");


    getArticles = () => {
        $.get("/articles").then(function (data) {
            articleContainer.empty();

            if (data && data.length) {
                renderArticles(data);
            }
            else {
                console.log("nothing to show")
            }
        })
    }
    renderArticles = articles => {
        const articleCards = [];

        articles.forEach((article) => {
            articleCards.push(makeCard(article));
        })
        articleContainer.append(articleCards);
    }
    makeCard = article => {
        const card = $("<div class='card m-4'>");
        const cardHeader = $("<div class ='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank'>")
                    .attr("href", article.link)
                    .text(article.title)
            ).append($("<h6>").text(article.date)
            ));
        const cardBody = $("<div class='card-body'>").text(article.summary);
        const cardBtn = $("<button id='comments' class='btn btn-primary'>").text("Comments")
        card.append(cardHeader, cardBody, cardBtn);
        card.data("_id", article._id);
        card.data("title", article.title);
        return card;
    }
    scrapeArticles = () => {
        $.get("/scrape").then(data => {
            getArticles();
            $("#scrapeModal").modal("toggle")
        });
    }
    renderComments = data => {
        $(".comment-container").empty();
        var comments = [];
        let currentComment;

        if (!data.comments.comments.length) {

            currentComment = $("<li class='list-group-item m-2'>No comments for this article yet.</li>")
            comments.push(currentComment);
        }
        else {
            data.comments.comments.forEach((data) => {

                currentComment = $("<li class='list-group-item note m-1'>").text(data.body)
                    .append($("<button class='close note-delete'>X</button>"));

                currentComment.children("button").data("_id", data._id);
                comments.push(currentComment);
            });
        }
        $(".comment-container").append(comments);
    }
    function handleComments(event) {
        const currentArticle = $(this).parents(".card").data();

        $.get("/articles/" + currentArticle._id).then(function (data) {
            $("#commentTitle").text("Comments for Article: " + currentArticle.title)
            $("#commentModal").modal("toggle")
            var commentData = {
                _id: currentArticle._id,
                comments: data || []
            };
            $(".btn#save").data("article", commentData);

            renderComments(commentData);
        });

    }
    saveComment = function () {
        let commentData;
        let newComment = $("#newComment").val().trim();

        if (newComment) {
            commentData = {
                _id: $(this).data("article")._id,
                body: newComment
            };
            $.post("/comments", commentData).then(() => {
                $("#commentModal").modal("toggle")
            })
            $("#newComment").val("");
        }

    }
    function handleNoteDelete() {
        var commentToDelete = $(this).data("_id");
        $.ajax({
            url: "/comments/" + commentToDelete,
            method: "DELETE"
        }).then(function () {

            $("#commentModal").modal("toggle")
        });
    }

    getArticles();
    $(document).on("click", "#scrapeNew", scrapeArticles);
    $(document).on("click", ".btn#comments", handleComments);
    $(document).on("click", ".btn#save", saveComment);
    $(document).on("click", ".close.note-delete", handleNoteDelete);

});