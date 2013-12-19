var logger = require('logga')()
  , yonder = require('./lib/yonder').createYonder({ logger: logger })
  , server = require('./express-server').createServer({ yonder: yonder, logger: logger })

logger.info('Starting')
server.start()