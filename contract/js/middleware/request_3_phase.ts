/**
 * http请求3个阶段的封装
 */
import {phase} from '../constant'

let lastActionMapper = {}

export function successType(type) {
  return type + phase.SUCCESS
}

export function failureType(type) {
  return type + phase.FAILURE
}

let uid = 1
export const request_3_phase = ({dispatch, getState}) => next => async action => {
  if (!action.effects && !action.http) {
    return next(action)
  }
  const type = action.type
  const startParam = action.startParam
  next({type: type + phase.START, ...startParam})
  action.uid = uid++
  lastActionMapper[type] = action.uid

  try {
    if (action.effects) {
      let data = await action.effects(getState())
      handleResponseData(data)
    }
    if (action.http) {
      let data = await action.http(getState())
      handleResponseData(data.data)
    }
  } catch (e) {
    // console.error(type, e)
    handleError(e)
  }

  function getDataReducerNeed(data) {
    if (!action.handleResponse) {
      return data
    }
    return action.handleResponse(data)
  }

  function handleResponseData(data) {
    if (action.uid != lastActionMapper[type]) {
      return
    }
    dispatch({type: successType(type), data: getDataReducerNeed(data)})
    setTimeout(() => {
      dispatch({
        type: type + phase.RESET
      })
    }, 0)
  }

  function handleError(result) {
    if (action.uid != lastActionMapper[type]) {
      return
    }
    dispatch({
      type: failureType(type),
      errorCode: result.errorCode,
      errorMsg: result.errorMsg || ('Error Code：' + result.errorCode),
      requestAction: action
    })
    setTimeout(() => {
      dispatch({
        type: type + phase.RESET
      })
    }, 0)
  }
}
