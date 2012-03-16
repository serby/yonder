var url = require('url')
  ,express = require('express')
  , yonder = require('./lib/yonder').createYonder()
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

function createNew(req, res) {
  var yindow = yonder.createYindow();
  res.redirect('/' + yindow.name);
}

function serve(req, res) {
  var yindow;
  yindow = yonder.find(req.params.yindow) || yonder.createYindow();

  res.render('index', {
    layout: false
  });
}

function setPane(req, res) {
  var yindow = yonder.find(req.params.yindow);
  yindow.panes[req.params.pane].set(url.parse(req.url, true).query.url);
  res.end();
}

io.sockets.on('connection', function (socket) {
  socket.on('register', function (data) {
    var yindow = yonder.find(data.name);
    yindow.panes.forEach(function(pane, index) {
      pane.on('set', function(setData) {
        setData.index = index;
        socket.emit('setPane', setData);
      });
    });
    socket.emit('setup', yindow);
  });
});

app.get('/', createNew);
app.get('/:yindow', serve);
app.get('/:yindow/:pane/', setPane);

app.listen(4031);
console.log('Express server listening on port http://localhost:%d in %s mode', app.address().port, app.settings.env);