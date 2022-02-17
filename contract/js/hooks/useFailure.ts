import getReduxState from './getReduxState'

function useFailure(types) {
  let successInfo = getReduxState((state) => {
    return state.error
  })
  return types.map(item => {
    return successInfo[item] || false
  })
}

export default useFailure
