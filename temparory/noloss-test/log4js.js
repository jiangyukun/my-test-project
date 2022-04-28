const log4js = require('log4js')
log4js.configure({
  appenders: {
    console: {type: 'console'},
  },
  categories: {
    default: {
      appenders: ['console'], level: 'trace'
    },
    NoLoss: {
      appenders: ['console'], level: 'error'
    }
  }
})


const logger = log4js.getLogger('NoLoss')


logger.info('hahaha')
logger.debug('ddd')
