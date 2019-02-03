var fs = require('fs')
var path = require('path')
// 类型对象
var typeMap = {}
var nameSpaceMap = {}
/* 命名的对应表 出现复杂类型名称相同时 *比如命名空间不同但类型名相同 在同一个文件引入时* 自增 */
var usedTypeNameMap = {}
/** 某个类型是否是列表 */
var responseIsListMap = {}
var typeEnmu = {
  integer: 'number',
  string: 'string',
  boolean: 'boolean',
  number: 'number',
  array: 'array',
  object: 'object',
  Int64: 'number',
  Int32: 'number',
  String: 'string',
  Date: 'string',
  Object: 'object'
}
function readLocalFile() {
  var swaggerfile = fs.readFileSync(path.resolve(__dirname, './swagger.json'))
  var swaggerjson = JSON.parse(swaggerfile)
  parseData(swaggerjson)
}

function readOnlineData() {
  var swaggerParser = require('swagger-parser-mock')
  var spec = swaggerParser('http://192.168.10.60:5000/swagger2/v1/swagger.json', {})
  // var spec = swaggerParser('http://devlego.schoolpal.cn/swagger2/v1/swagger.json', {})
  spec.then(
    swaggerjson => {
      fs.exists(path.join(process.cwd(), 'src/api2'), exists => {
        if (!exists) {
          fs.mkdirSync(path.resolve(process.cwd() + '/src/', 'api2'))
        }
        parseData(swaggerjson)
      })

      // fs.writeFile(path.resolve(__dirname, 'swagger.json'), JSON.stringify(swaggerjson), (err, fd) => {
      //     if (err) {
      //         if (err.code === 'EEXIST') {
      //             console.error('文件已存在')
      //             return
      //         }
      //         throw err
      //     } else {
      //         console.log('ENUM文件写入完成')
      //     }
      // })
    },
    res => {
      console.log('swagger站点发生错误')
    }
  )
}

function parseData(jsondata) {
  var definitions = jsondata.definitions
  var paths = jsondata.paths
  var defdataobj = handleDefinitions(definitions)
  var pathobj = handlePaths(paths)
  if (!fs.existsSync(path.resolve(process.cwd() + '/src/api2'))) {
    fs.mkdirSync(path.resolve(process.cwd() + '/src/api2'))
  }
  usedTypeNameMap = getRepeatType(usedTypeNameMap)
  witeFile('/src/api2/types/', defdataobj, generateType)
  witeFile('/src/api2/apis/', pathobj, generateApi, './../types/')
}

function witeFile(pathname, dataobj, makecodecb, typepath) {
  if (!fs.existsSync(path.resolve(process.cwd() + pathname))) {
    fs.mkdirSync(path.resolve(process.cwd() + pathname))
  }
  var keys = Object.keys(dataobj)
  keys.map(key => {
    if (key === 'ZDemo') {
      return
    }
    var filePath = path.resolve(process.cwd() + pathname, key + '.ts')
    fs.writeFile(filePath, makecodecb(dataobj[key], key, typepath), cb => {
      console.log('完成')
    })
  })
}

function parseArray(ref) {
  return ref.replace(/\[\]/, '')
}

function parseAdd(ref) {
  return ref.replace(/(\w+)\+/, '')
}

function checkIfUsedTypeName(type) {
  if (!type) {
    return false
  }
  var namearr = type.match(/\w+/g)

  var tag = false
  namearr.map(name => {
    if (usedTypeNameMap[name] && usedTypeNameMap[name].length > 1) {
      tag = true
    }
  })
  return tag
}

/** 找对应类型的命名空间 */
function updateTargetNamespaceType(namespaceObj, oldtype, newtype) {
  var keys = Object.keys(namespaceObj)
  var target = ''
  keys.map(key => {
    var info = namespaceObj[key]
    let index = info.indexOf(oldtype)
    if (index > -1) {
      info[index] = newtype
    }
  })
  return namespaceObj
}

function getRepeatType(maps) {
  var keys = Object.keys(maps)
  var obj = {}
  keys.map(key => {
    if (maps[key].length > 1) {
      obj[key] = maps[key]
    }
  })
  return obj
}

function checkIfUsed() {}

// type: apitype, module, url, summary, paramArr, realResponseType, refnamespace
// refnamespace 转换完成后的命名空间
// name: param.name,
// required: param.required,
// description: param.description.replace(/[\r\n]/g, ' '),
// type: paramtype
/** 生成Api代码 */
function generateApi(data, typename, typepath) {
  var codes = [],
    refs = {},
    refns = []
  // typeUsedCount = 0,
  var usedNS = {},
    repeatTag = false
  data.map(api => {
    if (usedTypeNameMap[api.realResponseType] && !repeatTag) {
      repeatTag = true

      usedTypeNameMap[api.realResponseType].map((type, index) => {
        usedNS[type + '_' + api.realResponseType] = index
      })
    }
    if (usedTypeNameMap[api.realResponseType]) {
      if (usedNS[api.realResponseNS + '_' + api.realResponseType] > 0) {
        let index = usedNS[api.realResponseNS + '_' + api.realResponseType]
        let newtype = api.realResponseType + '_' + index
        api.refnamespace = updateTargetNamespaceType(api.refnamespace, api.realResponseType, newtype)
        api.realResponseType = api.realResponseType.replace(api.realResponseType, newtype)
      }
    }

    var paramSum = [] // 参数注释拼装
    var paramDesc = [] // 形参参数拼装
    var paramToken = '' // 接口参数拼装
    api.paramArr.forEach(param => {
      paramSum.push(`* @params ${param.name}:${param.description}`)
      paramDesc.push(`${param.name}:${param.type}`)
    })

    // debugger
    var keys = Object.keys(api.refnamespace)
    keys.map(key => {
      // 只引入生成了namespace的文件和引用
      if (nameSpaceMap[key]) {
        if (refns.indexOf(key) == -1) {
          refns.push(key)
        }

        if (!refs[key]) {
          refs[key] = []
        }
        refs[key] = refs[key].concat(api.refnamespace[key])
      }
    })

    if (api.type === 'get') {
      paramToken = `${api.paramArr
        .map(pa => {
          return pa.name
        })
        .join(',')}`
      if (paramToken) {
        paramToken = `,{params:{${paramToken}}}`
      }
    } else {
      paramToken = `${api.paramArr
        .map(pa => {
          return pa.name
        })
        .join(',')}`
      if (api.paramArr.length == 1) {
        /** 修复 stuinfoId 类型为简单类型时 参数拼接错误的问题 */
        paramToken = typeEnmu[api.paramArr[0].type] ? `,{${api.paramArr[0].name}}` : `,${api.paramArr[0].name}`
      } else {
        paramToken = `,{${paramToken}}`
      }
    }
    // 解决泛型内数组类型错误
    let isList = false
    var nskeys = Object.keys(api.refnamespace)
    nskeys.map(ns => {
      if (responseIsListMap[ns] && responseIsListMap[ns].indexOf(api.simpleResponseType) > -1) {
        isList = true
      }
    })
    // 特殊处理 PageResult<string> 的类型 为数组类型
    if (
      api.realResponseType &&
      api.realResponseType.indexOf('PageResult') != -1 &&
      api.simpleResponseType === 'string'
    ) {
      console.log(api.name)
      api.realResponseType = api.realResponseType.replace(/(\>\>)/, '[]$1')
    } else if (isList && api.realResponseType.indexOf('[]') === -1) {
      api.realResponseType = api.realResponseType.replace(/(\>)/, '[]$1')
    }

    var str = `
        /** ${api.summary} */
export const ${api.name} = (${paramDesc}): AxiosPromise<${api.realResponseType || null}> => {
    return service.${api.type}('${api.url}'${paramToken})
    }

      `
    codes.push(str)
  })

  var refcodes = []
  refns.map(name => {
    refcodes.push(`import ${name} from "${typepath}${name}"`)
  })
  for (var pr in refs) {
    let arr = uniqueArr(refs[pr])
    arr.map(ref => {
      refcodes.push(`import ${ref} = ${pr}.${ref.replace(/_\d+$/, '')}`)
    })
  }

  return `
  import service from './../../api/net'
  import { AxiosPromise } from 'axios'
    ${refcodes.join('\n')}
    ${codes.join('\n')}

  `
}

/** 生成类型 */
function generateType(data, typename) {
  var codes = [],
    refs = {},
    refns = []

  data.map(typedata => {
    if (typedata.refnamespace) {
      //   debugger
      refns = refns.concat(typedata.refnamespace)
    }
    var str = `
            /** ${typedata.desc.replace(/(.{100})/gm, '$1\n* ')} */
            export interface ${parseAdd(typedata.typename)}{
                ${typedata.propArr.map(prop => {
                  if (prop.refType && typeMap[prop.refType] && typeMap[prop.refType] !== typename) {
                    if (!refs[prop.refnamespace]) {
                      refs[prop.refnamespace] = []
                    }
                    var t = parseArray(prop.type)
                    if (refs[prop.refnamespace].indexOf(t) === -1) {
                      refs[prop.refnamespace].push(t)
                    }
                  }
                  // 特殊处理 泛型、复杂类型、和标明必须字段的为必须，其他都可为空
                  return `
                        /** ${prop.desc.replace(/(.{100})/gm, '$1\n* ')} */
                        ${prop.name}${typedata.ifTemplate || !prop.simpletype || prop.required ? '' : '?'}:${parseAdd(
                    prop.type
                  )}
                    `
                })}
            }
        `
    codes.push(str)
  })
  refns = uniqueArr(refns)

  var refcodes = []
  refns.map(name => {
    refcodes.push(`import ${name} from "./${name}"`)
  })
  for (var pr in refs) {
    refs[pr].map(ref => {
      let str = `import ${ref} = ${pr}.${ref}`
      if (str.length > 100) {
        str.replace('=', '\n=')
      }
      refcodes.push(str)
    })
  }

  return `
    ${refcodes.join('\n')}
    namespace ${typename} {
        ${codes.join('\n')}
    }
    export default ${typename}
  `
}
/** 数组去重 */
function uniqueArr(arr) {
  let arr2 = []
  if (!arr) {
    return []
  }
  arr.map(tag => {
    if (arr2.indexOf(tag) === -1) {
      arr2.push(tag)
    }
  })
  return arr2
}

function handleDefinitions(definitions) {
  var defiMap = {}
  var keys = Object.keys(definitions)
  keys.map(key => {
    let typeInfo = definitions[key]
    let type = getType(key)
    let desc = typeInfo.description ? typeInfo.description.replace(/[\r\n]/g, ' ') : '描述缺失'

    let nameobj = getNameSpace(type)
    let namespace = nameobj.namespace
    let typename = nameobj.typename

    if (!usedTypeNameMap[typename]) {
      usedTypeNameMap[typename] = []
    }
    if (usedTypeNameMap[typename].indexOf(namespace) == -1) {
      usedTypeNameMap[typename].push(namespace)
    }

    // 保存类型对应的命名空间
    typeMap[type] = namespace
    // 保存类型间互相调用的命名空间
    let refnamespace = []
    let ifTemplate = testTemplate(type)
    let Tcount = 0,
      TcountArr = []
    if (ifTemplate) {
      // debugger
    }
    let properties = Object.keys(typeInfo.properties)
    let propArr = []
    properties.map(prop => {
      var propInfo = typeInfo.properties[prop]
      let innertype = ''
      // 复杂类型的引用
      let protype = '',
        typeobj = {},
        simpletype = false
      let required = propInfo.required || false
      let desc = propInfo.description ? propInfo.description.replace(/[\r\n]/g, ' ') : '描述缺失'
      if (ifTemplate && prop.match(/^(list|data|page)$/)) {
        // 特殊处理泛型
        TcountArr.push('T' + Tcount)
        innertype = 'T' + Tcount++
        if (propInfo.type == 'array') {
          // innertype += '[]'
          if (propInfo.items.$$ref) {
            var namespaceobj = getNameSpace(getType(propInfo.items.$$ref))
            if (!responseIsListMap[namespaceobj.namespace]) {
              responseIsListMap[namespaceobj.namespace] = []
            }
            responseIsListMap[namespaceobj.namespace].push(namespaceobj.typename)
          }
        }
      } else if (propInfo.enum) {
        // 处理简单枚举   type:1|2
        innertype = propInfo.enum.join('|')
        if (propInfo.type == 'array') {
          innertype = 'Array<' + innertype + '>'
        }
        desc += ' Enum 枚举类型'
      } else if (propInfo.items) {
        if (!propInfo.items.$$ref) {
          if (propInfo.items.enum) {
            innertype = propInfo.items.enum.join('|')
            if (propInfo.type == 'array') {
              innertype = 'Array<' + innertype + '>'
            }
            desc += ' Enum 枚举类型'
          } else {
            innertype = typeEnmu[propInfo.items.type]
            if (propInfo.type == 'array') {
              innertype += '[]'
            }
            simpletype = true
          }
        } else {
          protype = getType(propInfo.items.$$ref)
          typeobj = getNameSpace(protype)
          typeMap[protype] = typeobj.namespace
          if (namespace != typeobj.namespace) {
            refnamespace.push(typeobj.namespace)
          }

          innertype = typeobj.typename
          if (propInfo.type == 'array') {
            innertype += '[]'
          }
        }
      } else if (propInfo.$$ref) {
        protype = getType(propInfo.$$ref)
        typeobj = getNameSpace(protype)
        typeMap[protype] = typeobj.namespace
        if (namespace != typeobj.namespace) {
          refnamespace.push(typeobj.namespace)
        }

        innertype = typeobj.typename
      } else {
        if (propInfo.type === 'array') {
          innertype = []
        } else {
          innertype = typeEnmu[propInfo.type]
          simpletype = true
        }
      }
      // if (testTemplate(protype)) {
      //   debugger
      // }
      let obj = {
        name: prop,
        desc,
        type: innertype,
        refType: protype,
        simpletype,
        required: innertype === 'number' && namespace.indexOf('Response') > -1 ? true : required,
        refnamespace: typeobj.namespace
      }
      propArr.push(obj)
    })
    if (ifTemplate) {
      typename = typename + '<' + TcountArr.join(',') + '>'
    }

    var obj = { type, ifTemplate, desc, namespace, typename, propArr, refnamespace }

    if (!defiMap[namespace]) {
      defiMap[namespace] = []
    }
    if (!checkInclude(defiMap[namespace], obj)) {
      defiMap[namespace].push(obj)
    }
    nameSpaceMap[namespace] = true
  })
  return defiMap
}

function handlePaths(paths) {
  var keys = Object.keys(paths)
  var apiObj = {}
  keys.map(key => {
    let apitype = paths[key].post ? 'post' : 'get'
    let apiInfo = paths[key][apitype]
    let module = apiInfo.tags[0],
      url = key,
      summary = apiInfo.summary ? apiInfo.summary.replace(/[\r\n]/g, ' ') : ''

    var paramArr = [],
      refnamespace = {}
    let refTypes = []

    apiInfo.parameters.map(param => {
      var paramtype = '',
        parns = ''
      if (param.schema) {
        if (param.schema.$$ref) {
          let intype = getType(param.schema.$$ref)
          let nameobj = getNameSpace(intype)
          parns = nameobj.namespace
          paramtype = nameobj.typename
          refTypes.push(intype)
        } else {
          if (param.schema.items) {
            paramtype = typeEnmu[param.schema.items.type]
          }
          if (param.schema.type == 'array') {
            paramtype += '[]'
          }
        }
      } else {
        paramtype = typeEnmu[param.type]
      }

      let paramobj = {
        name: param.name === 'X-CSRF-TOKEN' ? 'req' : param.name,
        required: param.required,
        description: param.description ? param.description.replace(/[\r\n]/g, ' ') : '缺失描述',
        namespace: parns,
        type: paramtype
      }

      paramArr.push(paramobj)
    })

    if (!apiInfo.responses || !apiInfo.responses[200]) {
      console.error(key + ' 回传参数错误，请检查相关接口')
    }
    let response = apiInfo.responses ? apiInfo.responses[200] : {}

    let responseType = '',
      realResponseType = '',
      realResponseNS = ''
    if (response.schema) {
      realResponseType = getCleartype(response.schema.$$ref)

      let intype = getType(response.schema.$$ref)
      realResponseNS = getNameSpace(intype).namespace
      refTypes = refTypes.concat(getAllRefs(intype))
    } else {
      realResponseType = typeEnmu[response.type]
      // debugger
    }

    refTypes = uniqueArr(refTypes)

    refTypes.map(ref => {
      var refobj = getNameSpace(ref)
      if (!refnamespace[refobj.namespace]) {
        refnamespace[refobj.namespace] = []
      }
      if (refnamespace[refobj.namespace].indexOf(refobj.typename) === -1) {
        refnamespace[refobj.namespace].push(refobj.typename)
      }
    })

    if (!apiObj[module]) {
      apiObj[module] = []
    }
    var obj = {
      name: key.split('/').reverse()[0],
      type: apitype,
      module,
      url,
      summary,
      paramArr,
      realResponseType,
      simpleResponseType: realResponseType ? realResponseType.match(/\w+/g).pop() : '',
      realResponseNS,
      refnamespace
    }
    apiObj[module].push(obj)
  })
  return apiObj
}

function checkInclude(arr, newitem) {
  var res = arr.filter(a => {
    return a.typename == newitem.typename
  })
  return !!res.length
}

/** 过滤每一个类型 去除版本号程序集信息 */
function getType(ref) {
  if (!ref) {
    return ''
  }
  if (ref.indexOf('/') > -1) {
    ref = ref.split('/').reverse()[0]
  }
  ref = ref
    .replace(/(,[^\]]+(?=(\])))|`1/g, '')
    .replace(/(\[){2}/, '<')
    .replace(/(\]){2}/, '>')
  return ref
}

function getCleartype(ref) {
  if (!ref) {
    return ''
  }
  if (ref.indexOf('/') > -1) {
    ref = ref.split('/').reverse()[0]
  }
  ref = ref
    .replace(/([\w`]+\.)|(,[^\]]+(?=(\])))/g, '')
    .replace(/`1/g, '')
    .replace(/(\[){2}/g, '<')
    .replace(/(\]){2}/g, '>')
    .replace('Int64', 'number')
    .replace('Int32', 'number')
    // .replace(/u?int(eger|32|64)?|float|double|single|long|short|byte/gi, 'number')
    .replace('String', 'string')
    .replace('Boolean', 'boolean')
    .replace('Object', 'object')
    .replace(/(IList|List|IEnumerable)\<(\w+)\>/, '$2[]')
  return ref
}

function getWithSpacetype(ref) {
  if (ref.indexOf('/') > -1) {
    ref = ref.split('/').reverse()[0]
  }
  ref = ref.replace(/([\w`]+\.)|(,[^\]]+(?=(\])))/g, '').replace(/`1/g, '')
  return ref
}

/** 一次获取多个命名空间和引用类型 */
function getAllRefs(ref) {
  let arr = ref.match(/[\w.]+/g)
  return arr || []
}

/** 过滤泛型 */
function getTemplateType(ref) {
  if (ref.indexOf('/') > -1) {
    ref = ref.split('/').reverse()[0]
  }
  ref = ref.replace(/([\w.]+)[\w.\<\>]+(?=\>)/, '$1<T')
  getRealName(ref)
  return ref
}

/** 判断是否是泛型 */
function testTemplate(ref) {
  if (ref.indexOf('/') > -1) {
    ref = ref.split('/').reverse()[0]
  }
  return !!ref.match(/([\w.]+)[\w.\<\>]+(?=\>)/)
}

//SchoolPal.Cloud.ServiceModel.PageResult => PageResult
function getRealName(ref) {
  getNameSpace(ref).typename
}

function getNameSpace(ref) {
  // SchoolPal.Cloud.ServiceModel.PageResult<SchoolPal.Web.Model<Response.SelectCla>ssInfoFetchDataResponse>
  // =>
  // SchoolPalCloudServiceModel
  refsArr = ref.split('<')[0].split('.')
  let realName = refsArr.pop()
  return {
    namespace: refsArr.join(''),
    typename: realName
  }
}

// readLocalFile()
readOnlineData()
