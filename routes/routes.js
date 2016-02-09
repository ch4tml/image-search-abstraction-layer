"use strict";

var request = require("request");
var Search = require("bing.search");
var util = require('util');

/* GET home page */
exports.index = function(req, res){
    res.render('index', {
        title: "Image Search Abstraction Layer",
        author: "ch4tml"
    });
};

exports.output = function(req, res){
    res.render("output",{
        title: "Experiment page"
    });
};

exports.x = (req, res) => {
  //var re = new RegExp(/.\?\b/, gi);
  console.log(req.params);
  console.log(req.params.searchString);
  console.log(req.query.offset);
  //if(req.params.searchString)
};

exports.results = function(req, res){
  var search = new Search(process.env.ACCOUNT_KEY, 5);
  
  search.images(req.params.searchString,
    { top: 10,
    // Rudimentary pagination
      skip: req.query.offset
    },
    function(err, results) {
      var arr = [];
      if(err) throw err;
      else{
        results.forEach(function(item) {
          var tempObj = {};
          tempObj.url = item.url;
          tempObj.title = item.title;
          tempObj.thumbnail = item.thumbnail.url;
          tempObj.context = item.sourceUrl;
          arr.push(tempObj);
        });
        // Inspect results in console
        //console.log(util.inspect(results, {colors: true, depth: null}));
        res.end(JSON.stringify(arr));
      }
    }
  );
};