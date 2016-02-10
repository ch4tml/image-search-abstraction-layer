"use strict";

var request = require("request");
var Search = require("bing.search");
var util = require('util'); // For inspecting the results of the search
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/");
// Schema
var currentSearch = require("../models/currentSearch");

/* GET home page */
exports.index = function(req, res){
    res.render('index', {
        title: "Image Search Abstraction Layer",
        author: "ch4tml"
    });
};

/* GET results page - saved search term and returns json  */
exports.results = function(req, res){
  // Set params and query as variables
  var searchString = req.params.searchString;
  var offset = isNaN(req.query.offset) || req.query.offset === null || req.query.offset === undefined ? 0 : req.query.offset*10;
  // Set up schema to create new document
  var newSearch = new currentSearch();
  newSearch.term = searchString;
  // Save new document
  newSearch.save(function(err){
      if(err) return console.error(err);
      console.log("Search term saved successfully"); // Logging
  });
  // Perform search
  var search = new Search(process.env.ACCOUNT_KEY, 5);
  search.images(searchString,
    { top: 10,
    // Pagination - skips a certain number of entries
    // Multiplied by ten as search returns top ten results
      skip: offset
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