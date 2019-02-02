let ClassGenerator = require('../ClassGenerator')

module.exports = function generateModal(modalName, definition, registerClass) {
  if (modalName === 'DailySignImg') {
    debugger
  }
  let properties = definition.properties
  let constructorParamName = 'item'
  let propertyGenerator = new ClassGenerator(properties)
  let propertyStr = propertyGenerator.generate({
    constructorParamName,
    registerClass
  })

  return `
/**
 * ${definition.description}
 */
class ${modalName} {
  constructor(${constructorParamName}) {
    ${propertyStr}
  }
}
`
}
