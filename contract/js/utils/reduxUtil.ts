import {phase} from '../constant'

function getPrefix(type, phase) {
  return type.substring(0, type.indexOf(phase))
}

export function loading(state = {}, action) {
  if (action.type.endsWith(phase.START)) {
    let prefix = getPrefix(action.type, phase.START)
    return {
      ...state,
      [prefix]: true
    }
  }
  if (action.type.endsWith(phase.SUCCESS)) {
    let prefix = getPrefix(action.type, phase.SUCCESS)
    return {
      ...state,
      [prefix]: false
    }
  }
  if (action.type.endsWith(phase.FAILURE)) {
    let prefix = getPrefix(action.type, phase.FAILURE)
    return {
      ...state,
      [prefix]: false
    }
  }
  return state
}

export function success(state = {}, action) {
  if (action.type.endsWith(phase.START)) {
    let prefix = getPrefix(action.type, phase.START)
    return {
      ...state,
      [prefix]: false
    }
  }
  if (action.type.endsWith(phase.SUCCESS)) {
    let prefix = getPrefix(action.type, phase.SUCCESS)
    return {
      ...state,
      [prefix]: true
    }
  }
  if (action.type.endsWith(phase.FAILURE)) {
    let prefix = getPrefix(action.type, phase.FAILURE)
    return {
      ...state,
      [prefix]: false
    }
  }
  if (action.type.endsWith(phase.RESET)) {
    let prefix = getPrefix(action.type, phase.RESET)
    return {
      ...state,
      [prefix]: false
    }
  }
  return state
}

export function error(state = {}, action) {
  if (action.type.endsWith(phase.START)) {
    let prefix = getPrefix(action.type, phase.START)

    return {
      ...state,
      [prefix]: {errorCode: 0, errorMsg: ''}
    }
  }
  if (action.type.endsWith(phase.FAILURE)) {
    let prefix = getPrefix(action.type, phase.FAILURE)
    return {
      ...state,
      [prefix]: {
        errorCode: 1,
        errorMsg: action.errorMsg,
      }
    }
  }
  if (action.type.endsWith(phase.RESET)) {
    let prefix = getPrefix(action.type, phase.RESET)
    return {
      ...state,
      [prefix]: {
        errorCode: 0,
        errorMsg: '',
      }
    }
  }
  return state
}
