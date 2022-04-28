let Web3 = require('web3')
let ws = require('nodejs-websocket')
let KakiAbi = require('./abi/Kaki.json')
let OrecalAbi = require('./abi/MyChainLink.json')
let sendMail = require('./sendMail')

// let web3 = new Web3('https://kovan.infura.io/v3/26d7cfe1dab54f6c9cf1b539ce52cd4b')
// let web3 = new Web3('https://kovan.infura.io/v3/0712f8ee3e6a44e5a8e8d8e528e19052')
// let secret = '727fd91159464edcaf079dd7c7618da4'

function getCurrent(web3) {
    let KakiContract = new web3.eth.Contract(KakiAbi, '0x70234F347F7bF2abC1E07AbA368AAEbfF520A9a7')
    let OrecalContract = new web3.eth.Contract(OrecalAbi, '0x1Ee8d8bfa0839632F2CEA898b03439898a2052D6')
    return {
        web3,
        KakiContract,
        OrecalContract
    }
}

let provider1 = getCurrent(new Web3('https://kovan.infura.io/v3/26d7cfe1dab54f6c9cf1b539ce52cd4b'))// self
let provider2 = getCurrent(new Web3('https://kovan.infura.io/v3/0712f8ee3e6a44e5a8e8d8e528e19052'))
let provider3 = getCurrent(new Web3('https://kovan.infura.io/v3/559ceff656094781bca9fa221623cab5'))

let taskId

function switchType(type) {
    let newType = type + 1
    if (newType > 3) {
        newType = 1
    }
    try {
        sendMail('switchType', '191295604@qq.com', 'switchType', `
${newType}
 <div>https://kovan.infura.io/v3/26d7cfe1dab54f6c9cf1b539ce52cd4b</div>
 <div>https://kovan.infura.io/v3/0712f8ee3e6a44e5a8e8d8e528e19052</div>
 <div>https://kovan.infura.io/v3/559ceff656094781bca9fa221623cab5</div>
`)
    } catch (e) {

    }

    clearInterval(taskId)
    startTask(newType)
}

let currentBlockNumber, round, startBlockNumber, btcPrice

function startTask(type) {
    taskId = setInterval(() => {
        let provider
        if (type == 1) {
            provider = provider1
        } else if (type == 2) {
            provider = provider2
        } else if (type == 3) {
            provider = provider3
        }
        let successCount = 0, failureCount = 0
        const {web3, KakiContract, OrecalContract} = provider

        function checkIfNeedSwitch() {
            if (successCount + failureCount == 4) {
                if (failureCount != 0) {
                    console.log('switchType')
                    switchType(type)
                }
            }
        }

        function addSuccess() {
            successCount++
            checkIfNeedSwitch()
        }

        function addFailure() {
            failureCount++
            checkIfNeedSwitch()
        }

        web3.eth.getBlockNumber().then(res => {
            currentBlockNumber = res
            addSuccess()
        }).catch(e => {
            addFailure()
        })
        KakiContract.methods.getTradingRound(0).call().then(newRound => {
            addSuccess()
            KakiContract.methods.newPoolBlockNumber(0, newRound).call().then(newStartBlockNumber => {
                round = newRound
                startBlockNumber = newStartBlockNumber
                addSuccess()
            }).catch(e => {
                addFailure()
            })
        }).catch(e => {
            addFailure()
            addFailure()
        })
        OrecalContract.methods.latestAnswer().call().then(res => {
            btcPrice = res
            addSuccess()
        }).catch(e => {
            addFailure()
        })
        console.log(currentBlockNumber, round, startBlockNumber, btcPrice)
    }, 1000)
}

startTask(1)

let server = ws.createServer(function (conn) {
    addBlockNumber(conn)
    addRoundAndStartBlockNumber(conn)
    addBtcPrice(conn)
})

function addBlockNumber(conn) {
    let taskId
    let lastSendBlockNumber
    conn.on('text', (type) => {
        if (type == 'blockNumber') {
            taskId = setInterval(() => {
                if (lastSendBlockNumber != currentBlockNumber) {
                    lastSendBlockNumber = currentBlockNumber
                    conn.sendText(JSON.stringify({
                        type,
                        data: currentBlockNumber
                    }))
                }
            }, 1000)
        }
    })
    conn.on('close', () => {
        clearInterval(taskId)
    })
    conn.on('error', () => {
        clearInterval(taskId)
    })
}

function addRoundAndStartBlockNumber(conn) {
    let taskId
    let lastRound
    conn.on('text', (type) => {
        if (type == 'roundAndStartBlockNumber') {
            taskId = setInterval(() => {
                if (lastRound != round) {
                    lastRound = round
                    conn.sendText(JSON.stringify({
                        type,
                        data: {
                            round, startBlockNumber
                        }
                    }))
                }
            }, 1000)
        }
    })
    conn.on('close', () => {
        clearInterval(taskId)
    })
    conn.on('error', () => {
        clearInterval(taskId)
    })
}

function addBtcPrice(conn) {
    let taskId
    let lastPrice
    conn.on('text', (type) => {
        if (type == 'btcPrice') {
            taskId = setInterval(() => {
                if (lastPrice != btcPrice) {
                    lastPrice = btcPrice
                    conn.sendText(JSON.stringify({
                        type,
                        data: btcPrice
                    }))
                }
            }, 1000)
        }
    })
    conn.on('close', () => {
        clearInterval(taskId)
    })
    conn.on('error', () => {
        clearInterval(taskId)
    })
}

server.listen(8888)
