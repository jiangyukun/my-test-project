import {APP} from '../core/types'

let ignoreList = [
  'fetch',
  APP.wsServerTimestamp,
  APP.wsPrice,
  'ForceUpdate'
]
export const actionLog = ({dispatch, getState}) => next => action => {
  if (action.effects) {
    if (!action.type) {
      // debugger
    }
  }
  if (action.type && ignoreList.find(item => action.type.indexOf(item) != -1) == undefined) {
    console.log(action.type)
  }
  // const state: ReducerType = getState()

  return next(action)
}
