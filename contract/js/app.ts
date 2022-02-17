import store from './createStore'
import useMyAddress from './hooks/useMyAddress'
import useDispatch from './hooks/useDispatch'
import useMyProcess from './hooks/useMyProcess'
import useSuccess from './hooks/useSuccess'
import useFailure from './hooks/useFailure'
import useEffect from './hooks/useEffect'
import {buyTicket, claimBonus, fetchTicketInfo, placeBet, startWsType, useTicket} from './actions/app.action'
import {APP} from './core/types'
import {
  useChapterStart,
  useGameStatus,
  useIsBuyTicket,
  useNextGameRemainSeconds,
  useProcess,
  useRoundFireRemainSeconds,
  useRoundRemainSeconds
} from './hooks/useGlobal'


let roundFired = false
let showRoundInfo = true

store.subscribe(() => {
  const state = store.getState()
  const period = state.app.period
  const round = state.app.round
  const roundChip = state.app.roundChip
  const ticketList = state.app.ticketList
  const userBonus = state.app.userBonus
  const priceInfo = state.app.price
  const address = useMyAddress()
  const dispatch = useDispatch()
  const isStart = useChapterStart()
  const isBuyTicket = useIsBuyTicket()
  const fireRemainSeconds = useRoundFireRemainSeconds()
  const roundRemainSeconds = useRoundRemainSeconds()
  const nextGameSeconds = useNextGameRemainSeconds()
  const currentProcess = useMyProcess(round)
  const [buyTicketSuccess, placeBetSuccess] = useSuccess([APP.buyTicket, APP.placeBet])
  const [buyTicketFailure, placeBetFailure] = useFailure([APP.buyTicket, APP.placeBet])

  useEffect(() => {
    if (!isStart) {
      if (nextGameSeconds && nextGameSeconds % 10 == 0) {
        console.log(`nextGameSeconds ${nextGameSeconds}`)
      }
    }
  }, [isStart, nextGameSeconds])

  useEffect(() => {
    if (round !== null) {
      roundFired = false
      showRoundInfo = true
      console.log(`current round ${round}`)
    }
  }, [round])

  useEffect(() => {
    if (period !== null && userBonus !== null) {
      if (userBonus > 50) {
        dispatch(claimBonus())
      }
    }
  }, [period, userBonus])

  useEffect(() => {
    if (roundRemainSeconds !== null && showRoundInfo) {
      showRoundInfo = false
      console.log(`round remain ${roundRemainSeconds}`)
    }
  }, [roundRemainSeconds])

  useEffect(() => {
    if (isStart === false && ticketList !== null && isBuyTicket !== null) {
      if (!isBuyTicket) {
        if (ticketList.length == 0) {
          dispatch(buyTicket(address))
        } else {
          dispatch(useTicket(address, ticketList[0]))
        }
      } else {
        console.log('already use ticket')
      }
    }
  }, [isStart, ticketList])

  useEffect(() => {
    console.log(isBuyTicket, roundFired, fireRemainSeconds)
    if (isBuyTicket && !roundFired && fireRemainSeconds && fireRemainSeconds < 100) {
      roundFired = true
      console.log('price', priceInfo)
      console.log('currentProcess', currentProcess)
      if (roundChip > 0) {
        let call
        if (priceInfo && currentProcess) {
          if (Number(priceInfo.price) - currentProcess.startPrice > 0.1) {
            call = Math.floor(roundChip / 3)
          } else if ((Number(priceInfo.price) - currentProcess.startPrice > 0.05)) {
            call = Math.floor(roundChip / 4)
          } else {
            call = Math.floor(roundChip / 6)
          }
        } else {
          call = Math.floor(roundChip / 4)
        }
        if (roundChip > 1 && call == 0) {
          call = 1
        }
        console.log('placeBet', roundChip, call)
        dispatch(placeBet(call))
      }
    }
  }, [fireRemainSeconds])

  useEffect(() => {

  }, [placeBetSuccess])

  useEffect(() => {
    if (buyTicketSuccess) {
      dispatch(fetchTicketInfo(address))
    }
  }, [buyTicketSuccess])

  useGameStatus()
  useProcess()
})

store.dispatch(startWsType(APP.wsServerTimestamp, 'wsServerTimestamp'))
store.dispatch(startWsType(APP.wsPrice, 'FTMBinancePrice'))

setInterval(() => {
  store.dispatch({type: 'ForceUpdate'})
}, 5 * 1000)
