function Test() {
  let value = 1
  return () => {
    return value++
  }
}

let test1 = Test()
let test2 = Test()
console.log(test1())
console.log(test1())
console.log(test2())
