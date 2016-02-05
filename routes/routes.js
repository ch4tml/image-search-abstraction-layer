"use strict";
/* GET home page */
exports.index = function(req, res){
    res.render('index', {
        title: "Image Search Abstraction Layer",
        author: "ch4tml"
    });
};