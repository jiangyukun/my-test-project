import store from '../createStore'

function useDispatch() {
  return (action) => {
    store.dispatch(action)
  }
}

export default useDispatch
