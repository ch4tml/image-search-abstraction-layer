"use strict";

var request = require("request");
var https = require("https");

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

exports.json = function(request, response){
    //response.setHeader("Authorization", "Client-ID " + process.env.IMGUR_CLIENT_ID);
    var options = {
        hostname: "https://api.imgur.com/3/gallery/search/time/1/?q=lolcats",
        headers: {
            "Authorization" : "Client-ID " + process.env.IMGUR_CLIENT_ID
        }
    };
    console.log(options.headers.Authorization);
    console.log(options.hostname);
    //https.get("https://api.imgur.com/3/gallery/hot/viral/0.json", (res) => {
    https.get(options, (res) => {
      response.setHeader("Authorization", "Client-ID " + process.env.IMGUR_CLIENT_ID);
      res.on("data", (d) => {
        process.stdout.write(d);
        response.end(d);
      });
    }).on("error", (e) => {
        console.log(e);
    });
    
    // HTTPS REQUEST
    /*    
    var options = {
        hostname: "https://api.imgur.com/3/gallery/hot/viral/0.json",
        //port: 8080,
        path: '/',
        auth:{
            "Authorization" : "Client-ID " + process.env.IMGUR_CLIENT_ID
        },
        method: 'GET'
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode: ', res.statusCode);
      console.log('headers: ', res.headers);
    
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    req.end();
    
    req.on('error', (e) => {
      console.error(e);
    });*/
    /*
    var options = {
        method: "GET",
        port: 443,
        path: "/",
        hostname: "api.imgur.com/3/gallery/hot/viral/0.json",
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : "Client-ID " + process.env.IMGUR_CLIENT_ID
        }
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode: ', res.statusCode);
      console.log('headers: ', res.headers);
    
      res.on('data', (d) => {
        console.log(d);
      });
    });
      req.end();
    
    req.on('error', (e) => {
      console.error(e);
    });*/
};