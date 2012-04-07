module.exports.createServer = function(options) {

  var url = require('url')
    ,express = require('express')
    , app = express.createServer()
    , logger = options.logger || {
      info: console.info,
      log: console.log,
      debug: function() {
        console.info(arguments);
      }
    }
    , yonder = options.yonder
    , io = require('socket.io').listen(app, { logger: logger });

  require('./lib/socketIoAdaptor').createAdaptor(io, yonder);
  require('./lib/manageSocketIoAdaptor').createAdaptor(io, yonder);

  app.configure(function(){
    app.use(express.favicon(__dirname + '/public/images/favicon.png'))
      .set('views', __dirname + '/views')
      .set('view engine', 'jade')
      .use(require('stylus').middleware({ src: __dirname + '/public' }))
      .use(express.bodyParser())
      .use(express.methodOverride())
      .use(app.router)
      .use(express.static(__dirname + '/public'));
  });

  function createNew(req, res) {
    var yindow = yonder.createYindow();
    logger.log('Creating new yindow \'' + yindow.name + '\' for \'' + req.url + '\'');
    res.redirect('/' + yindow.name);
  }

  function serve(req, res) {
    var yindow = yonder.find(req.params.yindow);

    if (!yindow) {
       yindow = yonder.createYindow(url.parse(req.url).pathname.substring(1));
       return res.redirect('/' + yindow.name);
    }

    res.render('index', {
      layout: false
    });
  }

  function info(req, res) {
    var yindow;
    yindow = yonder.find(req.params.yindow) || yonder.createYindow();

    res.json(yindow);
  }

  function findPane(req) {

    var yindow = yonder.find(req.params.yindow);
    if (!yindow) {
      throw new Error('Unknown yindow ' + req.params.yindow);
    }
    return yindow.panes[req.params.pane];
  }


  function setPane(req, res) {
    var yindow = yonder.find(req.params.yindow);
    yindow.panes[req.params.pane].set(url.parse(req.url, true).query);
    res.end();
  }

  function setPaneFromPut(req, res) {
    findPane(req).set(req.body);
    res.end();
  }

  function hsplit(req, res) {
    var yindow = yonder.find(req.params.yindow);
    yindow.hsplit(req.params.pane, req.body);
    res.end();
  }

  function vsplit(req, res) {
    var yindow = yonder.find(req.params.yindow);
    yindow.vsplit(req.params.pane, req.body);
    res.end();
  }

  function manage(req, res) {
    res.render('manage', {
      layout: false
    });
  }

  app.get('/yonder', function(req, res) {
    res.send('Yonder');
  });

  app.get('/', createNew);
  app.get('/manage', manage);
  app.get('/:yindow', serve);
  app.get('/:yindow/info', info);
  app.get('/:yindow/:pane/', setPane);
  app.put('/:yindow/:pane/', setPaneFromPut);
  app.post('/:yindow/:pane/hsplit', hsplit);
  app.post('/:yindow/:pane/vsplit', vsplit);

  app.start = function() {
    app.listen(4031);
    logger.info('Yonder started - http://localhost:%d', app.address().port);
  };

  return app;
};