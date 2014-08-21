'use strict';

var Mongo = require('mongodb'),
    //   _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');


function Treasure(t){
  this.name       = t.name;
  this.loc        = t.loc;
  this.lat        = parseFloat(t.lat);
  this.lng        = parseFloat(t.lng);
  this.photo      = [];
  this.difficulty = t.difficulty;
  this.hint       = t.hint;
  this.found      = false;
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

Treasure.prototype.save = function(cb){
  var treasure = this;
  Treasure.collection.save(this, function(){
    cb(treasure);
  });
};

Treasure.prototype.toggleFound = function(){
  this.found = !this.found;
};

Treasure.prototype.uploadPhotos = function(files, cb){
  var dir = __dirname + '/../static/img/' + this._id,
  exist = fs.existsSync(dir),
  self = this;

  if(!exist){
    fs.mkdirSync(dir);
  }
  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        rel = '/img/' + self._id + '/' + self.photos.length + ext,
        abs = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
  this.save(cb);
};

/* Private Function

function changePrototype(obj){
  var treasure = _.create(Treasure.prototype, obj);
  return treasure;
}
*/
module.exports = Treasure;
