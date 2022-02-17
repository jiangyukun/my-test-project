import {combineReducers} from 'redux'
import {error, loading, success} from '../utils/reduxUtil'
import {APP} from '../core/types'
import {wsUpdateType} from '../middleware/websocket'
import data from './data.reducer'
import * as moment from 'moment'

function simple(type, value) {
  return (state = value, action) => {
    if (action.type == type) {
      return action.data
    }
    return state
  }
}

function socket(type, value) {
  return (state = value, action) => {
    if (action.type == wsUpdateType(type)) {
      return action.data
    }
    return state
  }
}

let initProcessItem = {call: null, put: null, startPrice: null, closePrice: null}

const rootReducer = combineReducers({
  app: combineReducers({
    serverTimestamp: socket(APP.wsServerTimestamp, null),
    price: socket(APP.wsPrice, null),
    localTimestamp: localTimestamp,

    period: data(APP.fetchCurrentChapterRound, null, data => data.period),
    round: data(APP.fetchCurrentChapterRound, null, data => data.round),
    userBonus: data(APP.fetchUserBonus, null),
    roundChip: data(APP.fetchRoundChip, null),
    initChips: data(APP.fetchRoundStartChips, null),
    nextGameTime: data(APP.fetch_nextGameTime, null),
    roundStartTime: data(APP.fetchRoundStartTime, null),
    ticketList: data(APP.fetchTicketInfo, null),

    myProcess1: data(APP.fetchMyProcess1, initProcessItem),
    myProcess2: data(APP.fetchMyProcess2, initProcessItem),
    myProcess3: data(APP.fetchMyProcess3, initProcessItem),
    myProcess4: data(APP.fetchMyProcess4, initProcessItem),
    myProcess5: data(APP.fetchMyProcess5, initProcessItem),
  }),
  loading,
  success,
  error,
})

export default rootReducer

function localTimestamp(state = null, action) {
  if (action.type == wsUpdateType(APP.wsServerTimestamp)) {
    return moment().valueOf()
  }
  return state
}
