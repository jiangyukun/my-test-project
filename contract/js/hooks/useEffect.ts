import {isEqual} from 'lodash'

let autoId = 1
let idMap = {}
let globalEffectList = []

function useEffect(callback, deps) {
  let uid = idMap[callback.toString()]
  if (!uid) {
    idMap[callback.toString()] = autoId++
  }
  let match = globalEffectList.find(item => item.uid == uid)
  if (!match) {
    globalEffectList.push({
      uid,
      callback,
      deps
    })
    callback()
  } else {
    if (!isEqual(match.deps, deps)) {
      match.callback = callback
      match.deps = deps
      callback()
    }
  }
}

export default useEffect
