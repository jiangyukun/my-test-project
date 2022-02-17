import store from '../createStore'
function getReduxState(callback) {
  return callback(store.getState())
}

export default getReduxState
