"use strict";

var Search = require("bing.search");
var util = require('util'); // For inspecting the results of the search
// Database setup
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
  var offset = isNaN(req.query.offset) || req.query.offset === null || req.query.offset === undefined ? 0 : req.query.offset*10; // Multiplied by ten as search returns top ten results
  
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
      skip: offset
    },
    function(err, results) {
      // Create empty array to store temporary result objects
      var arr = [];
      if(err) throw err;
      else{
        results.forEach(function(item) {
          // Temporary object to store each properties for each item on iteration
          var tempObj = {};
          tempObj.url = item.url;
          tempObj.title = item.title;
          tempObj.thumbnail = item.thumbnail.url;
          tempObj.context = item.sourceUrl;
          arr.push(tempObj);
        });
        // Inspect results in console
        //console.log(util.inspect(results, {colors: true, depth: null}));
        // Display array to page
        res.end(JSON.stringify(arr));
      }
    }
  );
};

exports.history = (req, res) => {
    currentSearch.find({},
    {_id: 0, __v: 0}) //  Removes _id and __v properties from json response
    .sort({when: -1}) // Sorts by searched-for date
    .exec(function(err, docs){ // Executes callback
      if(err) {
        console.log("Unable to find documents");
        throw err;
      }
      else
        res.end(JSON.stringify(docs));
    });
};