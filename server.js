var yonder = require('./lib/yonder').createYonder()
  , server = require('./express-server').createServer({ yonder: yonder })

server.start()