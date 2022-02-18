import {failureType, successType} from './request_3_phase'

let queue = []
let currentAction = null

export const handleChainContractMethod = ({dispatch, getState}) => (next) => {
  setInterval(() => {
    if (queue.length) {
      let action = queue[0]
      if (currentAction == null) {
        currentAction = action
        next(action)
        console.log('handleChainContractMethod', action.type)
      } else {
        // console.log('waiting', action.type)
      }
    }
  }, 500)

  return action => {
    if (action.type && currentAction) {
      if (action.type == successType(currentAction.type) || action.type == failureType(currentAction.type)) {
        queue.shift()
        currentAction = null
      }
    }
    if (action.effects) {
      if (action.type && action.type.indexOf('fetch') == -1) {
        queue.push(action)
        return
      }
    }
    return next(action)
  }
}

