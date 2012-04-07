var yonder = require('./lib/yonder').createYonder()
  , server = require('./expressServer').createServer({ yonder: yonder });

server.start();