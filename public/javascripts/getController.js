"use strict";

/*
(function() {
  var app = angular.module("newsApp", []);

  app.controller("NewsController", ["$document", "$http", function($document, $http) {
    var news = this;
    // Array to store stories from API
    news.allNews = [];
    $http.get("http://www.freecodecamp.com/news/hot").success(function(data) {
      // Iterate through each object in the array, in this case, each news story
      data.forEach(function(story) {
        var newsObject = {}; // temp object to store news information as object, this will be passed to array
        newsObject.headline = story.headline;
        newsObject.storyLink = story.storyLink;
        newsObject.datePosted = story.timePosted;
        newsObject.url = story.link;
        newsObject.metaDescription = story.metaDescription;
        newsObject.description = story.description;
        newsObject.image = !story.image ? story.author.picture : story.image;
        newsObject.userId = story.author.userId;
        newsObject.username = story.author.username;
        newsObject.upvotes = story.rank;

        news.allNews.push(newsObject);
      });
    }).error(function(response) {
      console.log("Err");
    });
  }]);
})();
*/

(function(){
    var app = angular.module("imgsrchApp", []);
    app.controller("RequestController", ["$document", "$http", function($document, $http){
        var requestor = this;
        requestor.allNews = [];
        $http({
            method: "GET",
            url: "http://www.freecodecamp.com/news/hot"
        }).then(function(data){
            requestor.allNews = data;
        }, function(){
            console.log("Error");
        });
    }]);
})();
