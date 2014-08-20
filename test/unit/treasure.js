/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Mongo     = require('mongodb'),
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var x = {name: 'ruby', lat: '40', lng: '40', photo: []},
          t = new Treasure(x);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('ruby');
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Treasure.all(function(err, treasure){
        expect(treasure).to.have.length(3);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new treasure', function(done){
      var x = {name: 'ruby', lat: '40', lng: '40', photo: []};
      Treasure.create(x, function(err, treasure){
        expect(treasure._id).to.be.instanceOf(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.findById',  function(){
    it('should find a treasure by ID', function(done){
      Treasure.findById('000000000000000000000001', function(treasure){
        expect(treasure.name).to.equal('Gold');
        done();
      });
    });
  });
//closing//
});

