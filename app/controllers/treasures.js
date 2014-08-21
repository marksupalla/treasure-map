'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasure/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(req.body, function(){
      res.redirect('/treasure');
    });
  });
};
exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasure/index', {treasures:treasures});
  });
};
exports.show = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasure/show',{treasure:treasure});
  });
};
exports.found = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    treasure.toggle();
    treasure.save(function(){
      res.redirect('/treasure');
    });
  });
};

