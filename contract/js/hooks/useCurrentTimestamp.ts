import getReduxState from './getReduxState'
import * as moment from 'moment'

function useCurrentTimestamp() {
  const serverTimestamp = getReduxState(state => state.app.serverTimestamp)
  const localTimestamp = getReduxState(state => state.app.localTimestamp)

  const getCurrent = (serverTimestamp) => {
    if (!localTimestamp || !serverTimestamp) {
      return null
    }
    let d = serverTimestamp + Math.ceil((moment().valueOf() - localTimestamp) / 1000)
    return d
  }

  return getCurrent(serverTimestamp)
}

export default useCurrentTimestamp
