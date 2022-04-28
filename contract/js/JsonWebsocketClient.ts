import * as WS from 'ws'

class JsonWebsocketClient {
  socketUrl
  ws
  opened = false
  sendList = []
  list = []

  constructor(socketUrl) {
    this.socketUrl = socketUrl
    this.initSocket(() => {
      this.opened = true
      this.sendList.forEach(item => {
        this.sendToServer(item.type, item.data)
      })
      this.sendList = []
    })
  }

  initSocket(openCallback) {
    try {
      this.ws = new WS(this.socketUrl)
      this.opened = false
      this.ws.on('open', openCallback)
      this.ws.on('message', (e) => this.onMessage(e))
      this.ws.on('close', () => {
        setTimeout(() => {
          this.refreshSocket()
        }, 1000)
      })
    } catch (e) {
      console.log(e.message)
      setTimeout(() => {
        this.refreshSocket()
      }, 1000)
    }
  }

  refreshSocket() {
    this.initSocket(() => {
      this.opened = false
      this.list.filter(item => item.once !== true).forEach(item => {
        this.sendToServer(item.type, item.data)
      })
    })
  }

  sendToServer(type, data) {
    this.ws.send(JSON.stringify({type, data}))
  }

  onMessage(e) {
    let result = JSON.parse(e)
    this.list.forEach(item => {
      if (item.type === result.type) {
        item.callback(result.data)
      }
    })
  }

  addWatch(type, data, callback) {
    if (this.opened) {
      this.sendToServer(type, data)
    } else {
      this.sendList.push({type, data})
    }
    this.list.push({
      type, data, callback
    })
  }

  close(type) {
    let index = this.list.findIndex(item => item.type === type)
    this.list.splice(index, 1)
    this.sendToServer('close', type)
  }
}

export default JsonWebsocketClient