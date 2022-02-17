import {phase} from '../constant'

const data = (fetchType, defaultData, handleData?) => {
  const initValue = defaultData
  return (iState = initValue, action) => {
    let nextState = iState ?? null

    let types = typeof fetchType == 'string' ? [fetchType] : fetchType
    for (let typeItem of types) {

      switch (action.type) {
        case typeItem + phase.START:
          if (action.reset) {
            // nextState = initValue
          }
          break

        case typeItem + phase.SUCCESS:
          nextState = handleData ? handleData(action.data) : action.data
          break

        case typeItem + phase.FAILURE:
          nextState = initValue
          break

        // case typeItem + phase.RESET:
        //   nextState = initValue
        //   break

        default:
          break
      }
    }

    return nextState
  }
}

export default data
