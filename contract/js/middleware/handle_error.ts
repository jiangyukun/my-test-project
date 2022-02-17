/**
 */
import {phase} from '../constant'

export const handle_error = ({dispatch, getState}) => next => action => {
  if (!action.type) {
    console.log(action)
  }
  if (action.type && action.type.indexOf(phase.FAILURE) !== -1) {
    // message.error(action.errorMsg)
    // console.error(action.errorMsg)
  }
  try {
    return next(action)
  } finally {

  }
}
