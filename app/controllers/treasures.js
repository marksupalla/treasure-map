'use strict';

var Treasure = require('../models/treasure');

exports.init = function(req, res){
  res.render('treasure/init');
};

exports.create = function(req, res){
  Treasure.create(req.body, function(){
    res.redirect('/treasure');
  });
};
exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasure/index', {treasures:treasures});
  });
};

