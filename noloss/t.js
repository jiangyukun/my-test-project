function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const a = (next) => () => {
  console.log(1)
  next()
}
const b = (next) => () => {
  console.log(2)
  next()
}
const c = (next) => () => {
  console.log(3)
  next()
}


let d = compose(a, b, c)(
  () => {
    console.log(4)
  }
)
d()
