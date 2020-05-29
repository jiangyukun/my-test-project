const t = require('@babel/types')
const {srcRoot} = require('./constants')

const {bootstrap, convertCodeUseAst} = require('./utils')

function convertFile(code, namespace, filePath) {
  let converted = false
  let resultCode = convertCodeUseAst(code, {
    ClassDeclaration(path1) {
      let node1 = path1.node
      const {superClass} = node1
      if(!superClass) {
        return
      }
      if(superClass.type == 'Identifier') {
        if(superClass.name == 'BasicTable') {
          let columns = []
          path1.traverse({
            ClassMethod(path2) {
              let node2 = path2.node
              if(node2.key.name == 'getColumns') {
                columns = node2.body.body[0].argument
                path2.traverse({
                  ObjectExpression(path3) {
                    let node3 = path3.node
                    path3.traverse({
                      MemberExpression(path4) {
                        let node4 = path4.node
                        if(node4.object.type == 'ThisExpression' && node4.property.name == 'props') {
                          path3.replaceWith(node4.property)
                        }
                      }
                    })
                    path3.skip()
                  }
                })
              }
            }
          })

          let typeColumns = t.identifier('columns')
          typeColumns.typeAnnotation = t.tsTypeAnnotation(
            t.tsArrayType(
              t.tsTypeReference(
                t.identifier('Column'),
                t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
              )
            )
          )

          let typeFunction = t.identifier(node1.id.name)
          typeFunction.typeAnnotation = t.tsTypeAnnotation(
            t.tsTypeReference(
              t.tsQualifiedName(t.identifier('React'), t.identifier('FC')),
              t.tsTypeParameterInstantiation([t.tsTypeReference(t.identifier('Props'))])
            )
          )

          let typeThis = t.identifier('this')
          typeThis.typeAnnotation = t.tsTypeAnnotation(t.tsNullKeyword())

          path1.replaceWith(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                typeFunction,
                t.functionExpression(
                  null,
                  [typeThis, t.identifier('props')],
                  t.blockStatement([
                    t.variableDeclaration('const', [
                      t.variableDeclarator(typeColumns, columns)
                    ]),
                    t.returnStatement(
                      t.jsxElement(
                        t.jsxOpeningElement(
                          t.jsxIdentifier('Table1'),
                          [
                            t.jsxAttribute(
                              t.jsxIdentifier('loading'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('loading')))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('dataSource'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('dataSource')))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('columns'),
                              t.jsxExpressionContainer(t.identifier('columns'))
                            )
                          ]
                        ),
                        t.jsxClosingElement(t.jsxIdentifier('Table1')),
                        [],
                        true
                      )
                    )
                  ])
                )
              )
            ])
          )
          converted = true
        }
      }
    }
  }, filePath)
  if(converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [{path: '.tsx', ns: 'empty'}])
