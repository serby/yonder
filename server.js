var logger = require('logga')({ logLevel: 'debug' })
  , yonder = require('./lib/yonder').createYonder({ logger: logger })
  , server = require('./express-server').createServer({ yonder: yonder, logger: logger })

logger.info('Starting')
logger.debug('debug')
server.start()