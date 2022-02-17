/**
 * websocket
 */
import {currentEnv, socketUrl} from '../core/config'
import mockProvider from '../mock/MockProvider'
import JsonWebsocketClient from '../JsonWebsocketClient'

const globalSocket = new JsonWebsocketClient(socketUrl)

export function wsUpdateType(type) {
  return type + '_ws_update'
}

export const websocket = ({getState}) => next => async (action) => {
  if (!action.wsType) {
    return next(action)
  }
  if (currentEnv == 'dev') {
    mockProvider.socket(action.wsType)
    return next(action)
  }
  if (action.wsType == 'close') {
    globalSocket.close(action.data)
    return
  }
  let actionData
  if (typeof action.data == 'function') {
    actionData = action.data(getState())
  } else {
    actionData = action.data
  }
  globalSocket.addWatch(action.wsType, actionData, (data) => {
    return next({
      type: wsUpdateType(action.type),
      data: data
    })
  })
}
