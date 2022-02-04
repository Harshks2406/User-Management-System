"use strict";

var express = require('express');

var hbs = require('hbs');

var path = require('path');

var app = express();
var port = process.env.PORT || 3535;
var static_Path = path.join(__dirname, "./public");
var templatepath = path.join(__dirname, "public/templates/views");
var partialpath = path.join(__dirname, "public/templates/partials");
app.set('view engine', 'hbs');
app.set('views', templatepath);
hbs.registerPartials(partialpath);
app.get('/', function (req, res) {
  res.render('index.hbs');
});
app.listen(port, function () {
  console.log("Server started on http://localhost:".concat(port));
});