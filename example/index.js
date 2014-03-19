var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var bodyDisposal = require('..');

var app = express();

var data = {};

_.templateSettings = {
  interpolate: /\{(.+?)\}/g
};
var template = _.template(''+fs.readFileSync('./templates/index.html'));

app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(function(req, res, next){
  console.log('BEFORE', req.body);
  next();
});
app.use(bodyDisposal());

app.get('/', function(req,res,next){
  res.send(template({_:data}));
});
app.post('/', function(req,res,next){
  console.log('AFTER', req.body);
  for (var i in req.body){
    data[i] = req.body[i];
  }
  delete data.json;
  data.json = JSON.stringify(data);
  res.redirect('/');
});

app.listen(3000);