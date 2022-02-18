import store from './createStore'
import useMyAddress from './hooks/useMyAddress'
import useDispatch from './hooks/useDispatch'
import useMyProcess from './hooks/useMyProcess'
import useEffect from './hooks/useEffect'
import {buyTicket, claimBonus, placeBet, startWsType, useTicket} from './actions/app.action'
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

  useEffect(() => {
    if (!isStart) {
      if (nextGameSeconds && nextGameSeconds % 2 == 0) {
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
    if (isBuyTicket && !roundFired && fireRemainSeconds && fireRemainSeconds < 20) {
      roundFired = true
      console.log('price', priceInfo)
      console.log('currentProcess', currentProcess)
      console.log('roundChip', roundChip)
      if (roundChip > 0) {
        let call
        if (priceInfo && currentProcess) {
          if (Number(priceInfo.price) - currentProcess.startPrice > 0.1) {
            call = Math.floor(roundChip / 2)
          } else if ((Number(priceInfo.price) - currentProcess.startPrice > 0.05)) {
            call = Math.floor(roundChip / 3)
          } else {
            call = Math.floor(roundChip / 4)
          }
        } else {
          call = Math.floor(roundChip / 2)
        }
        if (roundChip > 1 && call == 0) {
          call = 1
        }
        console.log('placeBet', roundChip, call)
        dispatch(placeBet(call))
      }
    }
  }, [fireRemainSeconds])

  useGameStatus()
  useProcess()
})

store.dispatch(startWsType(APP.wsServerTimestamp, 'wsServerTimestamp'))
store.dispatch(startWsType(APP.wsPrice, 'FTMBinancePrice'))

setInterval(() => {
  store.dispatch({type: 'ForceUpdate'})
}, 5 * 1000)
