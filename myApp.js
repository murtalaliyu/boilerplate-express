require('dotenv').config();     // to access environment variables
var bodyParser = require('body-parser');    // To parse the data coming from POST requests. This package allows you to use a series of middleware, which can decode data in different formats.

var express = require('express');
var app = express();
console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// a simple Root-Level Request Logger Middleware (middleware functions take in 3 arguments)
// app.use to hit every request - must appear before every dependent function
app.use(function (req, res, next) {
    // method path - ip
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

// serve static files (css, js, images, etc) at folder "/public"
staticFiles = __dirname + "/public";
app.use("/public", express.static(staticFiles));

// serve the index.html file when a client makes a GET request with path "/"
app.get("/", function(req, res) {
    //res.send("Hello Express");
    absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

// serve the string "work" when a client makes a GET request with path "/go"
app.get("/go", function(req, res) {
    res.send("work");
});

// serve json format for GET reqs @ /json
app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = "hello json".toUpperCase();
        res.json({"message": response});
    } else {
        res.json({"message": "hello json"});
    }
});

// chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the req.time key.
// In the handler, respond with a JSON object, taking the structure {time: req.time}.
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time" : req.time});
});

// get route parameters from req
app.get("/:word/echo/:num", function(req, res) {
    param1 = req.params.word;
    param2 = req.params.num;
    res.json({
        "param1" : param1,
        "param2" : param2
    });
});

// return body params from post req
app.post("/name", function(req, res) {
    // get data
    fullname = req.body.first + " " + req.body.last;

    // return as json
    res.json({"name":fullname, "type":"POST"});
});

// return query params from get req
app.get("/name", function(req, res) {
    fullname = req.query.first + " " + req.query.last;
    res.json({"name":fullname, "type":"GET"});
})

// get body content from post req
app.post("/body", function(req, res) {
    res.send(req.body);
});

// get headers
app.get("/header", function(req, res) {
    res.json(req.headers);
})

// ------------------------------ load json file -----------------------------------------
const jsonFile = require('C:/Users/murta/Documents/FreeCodeCamp/boilerplate-express/file.json');
console.log(jsonFile);


 module.exports = app;
