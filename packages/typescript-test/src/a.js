const {createProgram, createPrinter, transform, EmitHint} = require('typescript')

let program = createProgram({
  rootNames: [__dirname], options: {
    include: ['src/**/*'],
    "exclude": [
      "node_modules",
      "**/*.spec.ts"
    ]
  }
})

const sourceFiles = program.getSourceFiles()


const typeChecker = program.getTypeChecker()

const result = transform(sourceFiles, [
])

const printer = createPrinter()
const printed = printer.printNode(
  EmitHint.SourceFile,
  result.transformed[0],
  sourceFiles[0]
)

// const res = prettier.format(printed, {
//   semi: true,
//   singleQuote: true,
//   trailingComma: 'es5',
//   bracketSpacing: true,
//   parser: 'typescript',
// })

 const removeStaticPropTypes = (typeChecker) => (
  context
) => (sourceFile) => {
  const visitor = (node) => {
    if (isClassDeclaration(node) && isReactClassComponent(node, typeChecker)) {
      return updateClassDeclaration(
        node,
        node.decorators,
        node.modifiers,
        node.name,
        node.typeParameters,
        createNodeArray(node.heritageClauses),
        node.members.filter(m => {
          if (
            isPropertyDeclaration(m) &&
            isStaticMember(m) &&
            isPropTypesMember(m)
          ) {
            // static and propTypes
            return false
          }

          if (
            isGetAccessorDeclaration(m) &&
            isStaticMember(m) &&
            isPropTypesMember(m)
          ) {
            // static and propTypes
            return false
          }

          return true
        })
      )
    }
    return node
  }

  return visitEachChild(sourceFile, visitor, context)
}