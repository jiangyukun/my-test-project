import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers'
import {handleChainContractMethod} from './middleware/handleChainContractMethod'
import {actionLog} from './middleware/actionLog'
import {request_3_phase} from './middleware/request_3_phase'
import {websocket} from './middleware/websocket'
import {handle_error} from './middleware/handle_error'

let store = createStore(rootReducer,
  {},
  applyMiddleware(
    handleChainContractMethod,
    actionLog,
    request_3_phase,
    websocket,
    handle_error,
  )
)

export default store
