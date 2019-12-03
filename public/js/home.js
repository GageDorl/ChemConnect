$(document).ready(function(){
    var queryParams = { "api-key": "G4aZQLEtWcian3wPMmhgcXLRCEbe3RaY" };
    queryParams.q="chemistry";
    queryParams.begin_date=moment().format("YYYY")+"0101";
    var url ="https://api.nytimes.com/svc/search/v2/articlesearch.json?"+ $.param(queryParams);
    console.log("trying")
    $.get(url).then(function(NYTData){
        for (var i = 0; i < 3; i++) {
            // Get specific article info for current index
            var article = NYTData.response.docs[i];
        
            // Increase the articleCount (track article # - starting at 1)
            var articleCount = i + 1;
        
            // Create the  list group to contain the articles and add the article content for each
            var $articleList = $("<ul>");
            $articleList.addClass("list-group");
        
            // Add the newly created element to the DOM
            $("#article-section").append($articleList);
        
            // If the article has a headline, log and append to $articleList
            var headline = article.headline;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
        
            if (headline && headline.main) {
            console.log(headline.main);
            $articleListItem.append(
                "<span class='label label-primary'>" +
                articleCount +
                "</span>" +
                "<strong> " +
                headline.main +
                "</strong>"
            );
            }
             // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }
    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
        }
    });
});