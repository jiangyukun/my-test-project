const fs = require('fs')
const generateShape = require('./convert')
const {writeCodeToFile} = require('../../utils/fileUtil')


let prefix = 'E:\\Project2021\\scone-view\\src\\container\\monitor-config\\svg'

let shapes = ''
// shapes += generateShape('T1', fs.readFileSync('./T1.svg').toString())
// shapes += generateShape('T2', fs.readFileSync('./T2.svg').toString())
// shapes += generateShape('T3', fs.readFileSync('./T3.svg').toString())
// shapes += generateShape('T4', fs.readFileSync('./T4.svg').toString())
shapes += generateShape('D2', fs.readFileSync(prefix + '/2.svg').toString())


let list = [
  {
    name: 'D1',
    path: prefix + '/1.svg'
  },
  {
    name: 'D2',
    path: prefix + '/2.svg'
  },
  {
    name: 'D3',
    path: prefix + '/3.svg'
  },
  {
    name: 'D4',
    path: prefix + '/4.svg'
  },
  {
    name: 'D5',
    path: prefix + '/5.svg'
  },
  {
    name: 'D6',
    path: prefix + '/6.svg'
  },
  {
    name: 'D7',
    path: prefix + '/7.svg'
  },
  {
    name: 'D8',
    path: prefix + '/8.svg'
  },
  {
    name: 'D9',
    path: prefix + '/9.svg'
  },
  {
    name: 'D10',
    path: prefix + '/10.svg'
  }
]

list.forEach(item=> {
  try {
    let content = generateShape(item.name, fs.readFileSync(item.path).toString())
    writeCodeToFile('E:\\Project2021\\scone-view\\src\\graph\\shapes/' + item.name+ '.ts', content)
  } catch (e) {
    console.log(e);
  }


})


console.log(shapes);
