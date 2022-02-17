import getReduxState from './getReduxState'

function useMyProcessList() {
  const myProcess1 = getReduxState(state => state.app.myProcess1)
  const myProcess2 = getReduxState(state => state.app.myProcess2)
  const myProcess3 = getReduxState(state => state.app.myProcess3)
  const myProcess4 = getReduxState(state => state.app.myProcess4)
  const myProcess5 = getReduxState(state => state.app.myProcess5)

  return [myProcess1, myProcess2, myProcess3, myProcess4, myProcess5]
}

export default useMyProcessList
