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
        if(superClass.name == 'PageTable') {
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
                      MemberExpression(path3) {
                        let node3 = path3.node
                        if(node3.object.type == 'ThisExpression') {
                          path3.replaceWith(node3.property)
                        }
                      }
                    })
                    path3.skip()
                  }
                })
              }
            }
          })

          let d = t.identifier('columns')
          d.typeAnnotation = t.typeAnnotation(t.anyTypeAnnotation())
          path1.replaceWith(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier(node1.id.name),
                t.functionExpression(
                  null,
                  [t.identifier('props')],
                  t.blockStatement([
                    t.variableDeclaration('const', [

                      t.variableDeclarator(d, columns)
                    ]),
                    t.returnStatement(
                      t.jsxElement(
                        t.jsxOpeningElement(
                          t.jsxIdentifier('Table2'),
                          [
                            t.jsxAttribute(
                              t.jsxIdentifier('loading'),
                              t.jsxExpressionContainer(t.identifier('loading'))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('dataSource'),
                              t.jsxExpressionContainer(t.identifier('dataSource'))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('columns'),
                              t.jsxExpressionContainer(t.identifier('columns'))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('page'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('page')))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('size'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('size')))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('total'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('total')))
                            ),
                            t.jsxAttribute(
                              t.jsxIdentifier('onPageChange'),
                              t.jsxExpressionContainer(t.memberExpression(t.identifier('props'), t.identifier('onPageChange')))
                            )
                          ]
                        ),
                        t.jsxClosingElement(t.jsxIdentifier('Table2')),
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
  })
  if(converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [{path: '.tsx', ns: 'empty'}])
