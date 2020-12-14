let strList = ['abca', 'cab', 'caba', 'acab']

function commonStr(list) {
  let dp = []
  let pos = index(list)
  for (let i = 0; i < list[0].length; i++) {
    dp[i] = []
    for (let j = i; j < list[0].length; j++) {
      if (j > i && dp[i][j - 1] != 1) {
        continue
      }
      let flag = true
      for (let k = 1; k < list.length; k++) {
        let startIndexes = pos[i][k].filter(index => list[k][index] == list[0][i])
        let match = startIndexes.find(index=> {
          if (list[0][j] == list[k][index + (j - i)]) {
            return true
          }
          return false
        })
        if (match === undefined) {
          flag = false
        }
      }
      if (flag) {
        dp[i][j] = 1
      } else {
        dp[i][j] = 0
      }
    }
  }

  for (let i = 0; i < list[0].length; i++) {
    let result = []
    for (let j = 0; j < list[0].length; j++) {
      result.push(dp[i][j] || 0)
    }
    console.log(result)
  }
}

function index(list) {
  let pos = []
  for (let i = 0; i < list[0].length; i++) {
    pos[i] = []
    for (let k = 1; k < list.length; k++) {
      pos[i][k] = []
      for (let m = 0; m < list[k].length; m++) {
        if (list[0][i] == list[k][m]) {
          pos[i][k].push(m)
        }
      }
    }
  }
  return pos
}

commonStr(strList)
