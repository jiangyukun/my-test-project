const APP = {
  wsServerTimestamp: null,
  wsPrice: null,
  buyTicket: null,
  useTicket: null,
  fetchTicketInfo: null,
  placeBet: null,
  fetchCurrentChapterRound: null,
  fetchRoundChip: null,
  fetchRoundStartTime: null,
  fetchUserBonus: null,
  claimBonus: null,
  fetchTotalBonus: null,
  fetchRoundStartChips: null,
  fetch_nextGameTime: null,

  fetchGlobalProcess1: null,
  fetchGlobalProcess2: null,
  fetchGlobalProcess3: null,
  fetchGlobalProcess4: null,
  fetchGlobalProcess5: null,
  fetchMyProcess1: null,
  fetchMyProcess2: null,
  fetchMyProcess3: null,
  fetchMyProcess4: null,
  fetchMyProcess5: null,
}

generatorValueFromKey('APP', APP)

function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix, obj) {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export {
  APP
}
