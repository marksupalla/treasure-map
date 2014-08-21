'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    treasure       = require('../controllers/treasures');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

  app.get('/treasure/new', treasure.init);
  app.post('/treasure', treasure.create);
  app.get('/treasure', treasure.index);
  app.get('/treasure/:id', treasure.show);
  app.post('/treasure/:id/found', treasure.found);
  console.log('Express: Routes Loaded');
};

