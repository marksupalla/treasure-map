'use strict';

var Mongo = require('mongodb');
//    _     = require('lodash');

function Treasure(t){
  this.name       = t.name;
  this.lat        = parseFloat(t.lat);
  this.lng        = parseFloat(t.lng);
  this.photo      = [];
  this.difficulty = t.difficulty;
  this.hint       = t.hint;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasure');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.create = function(o, cb){
  var t = new Treasure(o);
  Treasure.collection.save(t, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, obj){
    var treasure = obj;
    cb(treasure);
  });
};
module.exports = Treasure;
