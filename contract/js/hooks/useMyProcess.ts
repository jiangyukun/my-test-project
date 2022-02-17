import getReduxState from './getReduxState'

function useMyProcess(round) {
  const myProcess1 = getReduxState(state => state.app.myProcess1)
  const myProcess2 = getReduxState(state => state.app.myProcess2)
  const myProcess3 = getReduxState(state => state.app.myProcess3)
  const myProcess4 = getReduxState(state => state.app.myProcess4)
  const myProcess5 = getReduxState(state => state.app.myProcess5)

  let previousRoundMyProcess = null
  if (round === 0) {
    previousRoundMyProcess = myProcess1
  }
  if (round === 1) {
    previousRoundMyProcess = myProcess2
  }
  if (round === 2) {
    previousRoundMyProcess = myProcess3
  }
  if (round === 3) {
    previousRoundMyProcess = myProcess4
  }
  if (round === 4) {
    previousRoundMyProcess = myProcess5
  }
  return previousRoundMyProcess
}

export default useMyProcess
