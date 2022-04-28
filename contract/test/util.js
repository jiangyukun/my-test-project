const {BigNumber}  =require( 'ethers')

function _getTokenDisplay(d, precision = 2, tokenLength = 18) {
  if (!d) {
    return null
  }
  if (typeof d == 'string') {
    d = BigNumber.from(d)
  }
  //bignumber 无法处理小数，除以16个0，再除以100
  let divStr = '1'
  for (let i = 1; i <= tokenLength - precision; i++) {
    divStr += '0'
  }
  try {
    // let result = d.div(BigNumber.from(divStr)).toNumber()
    let result = BigNumber.from(d).div(BigNumber.from(divStr)).toNumber()
    if (result !== null && result !== undefined) {
      return Number((result / Math.pow(10, precision)).toFixed(precision))
    }
    return null
  } catch (e1) {
    if (e1.reason == 'overflow' && e1.code == 'NUMERIC_FAULT') {
      try {
        return d.div(BigNumber.from('1000000000000000000')).toNumber()
      } catch (e2) {
        if (e2.reason == 'overflow' && e2.code == 'NUMERIC_FAULT') {
          return Number(e2.value)
        }
      }
    }
  }
}


function _getTokenValue(v, precision = 2, tokenLength = 18) {
  let d = _getTokenDisplay(v, precision, tokenLength)
  if (d !== null) {
    return Number(d)
  }
  return null
}

function createRequestManage(limit) {
  let currentTotal = 0
  let todoList = []
  return {
    schedule(callback) {
      if (currentTotal > limit) {
        todoList.push(callback)
      } else {
        currentTotal++
        let next = () => {
          currentTotal--
          if (todoList.length > 0) {
            let cb = todoList.shift()
            cb().finally(next)
          }
        }
        callback().finally(next)
      }
    }
  }
}

const requestManage = createRequestManage(500)

const logger = {
  trace: console.log,
  debug: console.log,
  error: console.log
}

function _listTaskWithRetry(label, list, options, level = 1) {
  const {tryLimit = 10, doRequest, onSuccess, onComplete, onError} = options
  if (level == 1) {
    logger.trace(`start ${label} task: `, list.length)
  } else {
    logger.debug(`retry ${label} task: `, list.length)
  }
  if (level > tryLimit) {
    onError(new Error('TryLimitError'))
    return
  }
  if (list.length == 0) {
    onComplete()
    return
  }
  let successCount = 0
  let failureList = []

  let taskId = setInterval(() => {
    logger.debug(`task: ${label}`, list.length, successCount, failureList.length)
  }, 10 * 1000)

  let checkIsFinish = () => {
    if (successCount + failureList.length == list.length) {
      if (failureList.length == 0) {
        try {
          onComplete()
        } catch (e) {
          // if (e instanceof LossItemError) {
          //   logger.debug('LossItemError', e.list.join(' '))
          //   setTimeout(() => {
          //     listTaskWithRetry(label, e.list, options, level + 1)
          //   }, 2000 * level)
          // } else {
          // }
          onError(e)
        }
      } else {
        setTimeout(() => {
          listTaskWithRetry(label, failureList, options, level + 1)
        }, 2000 * level)
      }
      clearInterval(taskId)
    }
  }
  list.forEach(item => {
    requestManage.schedule(() => {
      return doRequest(item).then(res => {
        try {
          onSuccess(item, res)
          successCount++
        } catch (e) {
          failureList.push(item)
          logger.debug('onSuccess error: ' + e.message)
        }
        checkIsFinish()
      }).catch(e => {
        if (options.onItemError) {
          if (options.onItemError(e) === false) {
            successCount++
            checkIsFinish()
            return
          }
        }
        if (e && e.reason) {
          // logger.error(e.reason)
        } else if (e && e.message) {
          if (e.message.indexOf('502 Bad Gateway') != -1) {
            logger.error('502')
          } else {
            logger.error(e.message)
          }
        } else {
          logger.error(e)
        }
        failureList.push(item)
        checkIsFinish()
      })
    })
  })
}

module.exports = {
  _listTaskWithRetry,
  _getTokenValue
}