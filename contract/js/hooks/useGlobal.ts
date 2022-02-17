import useMyAddress from './useMyAddress'
import getReduxState from './getReduxState'
import useSuccess from './useSuccess'
import {APP} from '../core/types'
import useDispatch from './useDispatch'
import useEffect from './useEffect'
import {
  fetchCurrentChapterRound,
  fetchNextGameTime, fetchRoundChip,
  fetchRoundStartChips, fetchRoundStartTime,
  fetchTicketInfo,
  fetchTotalBonus,
  fetchUserBonus
} from '../actions/app.action'
import useCurrentTimestamp from './useCurrentTimestamp'
import {periodSeconds, roundFireSeconds, roundSeconds} from '../core/config'
import {fetchMyProcess} from '../actions/process.action'

export function useGameStatus() {
  const address = useMyAddress()
  const period = getReduxState(state => state.app.period)
  const round = getReduxState(state => state.app.round)
  const isChapterStart = useChapterStart()
  const [buyTicketSuccess, claimBonusSuccess] = useSuccess([APP.buyTicket, APP.claimBonus])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentChapterRound())
    setInterval(() => {
      dispatch(fetchCurrentChapterRound())
    }, 15000)
  }, [])

  useEffect(() => {
    if (period !== null) {
      dispatch(fetchRoundStartChips(period, address))
      dispatch(fetchNextGameTime())
      dispatch(fetchTicketInfo(address))
    }
  }, [period])

  useEffect(() => {
    if (period !== null) {
      dispatch(fetchUserBonus())
      dispatch(fetchTotalBonus(period))
    }
  }, [period])

  useEffect(() => {
    if (period !== null && !isChapterStart) {
      let taskId = setInterval(() => {
        dispatch(fetchTotalBonus(period))
      }, 15 * 1000)
      return () => {
        clearInterval(taskId)
      }
    }
  }, [period, isChapterStart])

  useEffect(() => {
    if (round !== null) {
      dispatch(fetchRoundChip())
    }
  }, [round])

  useEffect(() => {
    if (period !== null && round !== null) {
      dispatch(fetchRoundStartTime(period, round))
      dispatch(fetchRoundStartChips(period, address))
    }
  }, [period, round])

  useEffect(() => {
    if (buyTicketSuccess) {
      console.log(3)
      dispatch(fetchRoundStartChips(period, address))
    }
  }, [buyTicketSuccess])

  useEffect(() => {
    if (claimBonusSuccess) {
      dispatch(fetchUserBonus())
    }
  }, [claimBonusSuccess])
}

export function useProcess() {
  const period = getReduxState(state => state.app.period)
  const round = getReduxState(state => state.app.round)

  const [placeBetSuccess] = useSuccess([APP.placeBet])
  const dispatch = useDispatch()

  useEffect(() => {
    if (period !== null && round !== null) {
      for (let i = 0; i <= round; i++) {
        dispatch(fetchMyProcess(period, i))
      }
    }
  }, [period])

  useEffect(() => {
    if (round !== null) {
      if (round > 0) {
        dispatch(fetchMyProcess(period, round - 1))
      }
      dispatch(fetchMyProcess(period, round))
    }
  }, [round])

  useEffect(() => {
    if (placeBetSuccess) {
      dispatch(fetchMyProcess(period, round))
    }
  }, [placeBetSuccess])
}

export function useRoundRemainSeconds() {
  let passed = useRoundPassedSeconds()
  if (passed === null) {
    return null
  }
  let d = roundSeconds - passed
  if (d <= 0) {
    return 0
  }
  return d
}

export function useRoundFireRemainSeconds() {
  let passed = useRoundPassedSeconds()
  let d = roundFireSeconds - passed
  if (d <= 0) {
    return 0
  }
  return d
}

export function useRoundPassedSeconds() {
  let roundStartTime = getReduxState(state => state.app.roundStartTime)
  const currentTime = useCurrentTimestamp()
  if (!roundStartTime || !currentTime) {
    return null
  }
  return currentTime - roundStartTime
}

export function useChapterStart() {
  const round = getReduxState(state => state.app.round)
  let roundStartTime = getReduxState(state => state.app.roundStartTime)
  let nextGameTime = getReduxState(state => state.app.nextGameTime)
  let currentTime = useCurrentTimestamp()
  if (currentTime < nextGameTime) {
    return false
  }
  if (round === 0 && roundStartTime == 0) {
    return false
  }
  return round !== null
}

export function useIsBuyTicket() {
  const initChips = getReduxState(state => state.app.initChips)
  if (initChips === null) {
    return null
  }
  return initChips > 0
}

export function useNextGameRemainSeconds() {
  const isChapterStart = useChapterStart()
  const nextGameTime = getReduxState(state => state.app.nextGameTime)
  const currentTime = useCurrentTimestamp()
  if (!nextGameTime || !currentTime) {
    return null
  }

  let nextGameRemainTime = nextGameTime - currentTime
  if (isChapterStart) {
    nextGameRemainTime = periodSeconds - (currentTime - nextGameTime)
  }
  return nextGameRemainTime
}
