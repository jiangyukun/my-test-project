let path = require('path')

let fs = require('fs')

let result = fs.readFileSync('C:\\Users\\jiangyu\\WebstormProjects\\wanke-script\\bin\\wanke-scripts.js')


for (let i of result) {
    console.log(i)
}