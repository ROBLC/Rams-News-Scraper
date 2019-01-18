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
            )
        );
        const cardBody = $("<div class='card-body'>").text(article.summary);
        const cardBtn = $("<button class='btn btn-primary'>").text("Comments")
        card.append(cardHeader, cardBody, cardBtn);
        card.data("_id", article._id);
        return card;
    }
    scrapeArticles = () => {
        $.get("/scrape").then(data => {
            getArticles();
            $("#scrapeModal").modal("toggle")
        });
    }
    handleComments = event => {
        const currentArticle = $(this).parents(".card").data();
    }
    getArticles();
    $(document).on("click", "#scrapeNew", scrapeArticles);
});