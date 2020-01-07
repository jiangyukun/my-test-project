let list = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

let rows = ['unit', 'value', 'qita'].map(key => {
  let row = {}
  list.forEach((item, index) => {
    row['column' + index] = list[key]
  })
  return row
})
