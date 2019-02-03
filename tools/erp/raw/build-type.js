var fs = require('fs')
var path = require('path')
var tslint = require('tslint')
var prettier = require('prettier')
var apiMap = {}

var swaggerParser = require('swagger-parser-mock')

var spec = swaggerParser('http://devlego.schoolpal.cn/swagger2/v1/swagger.json', {})
spec.then(
    swaggerjson => {
        fs.exists(path.join(process.cwd(), 'src/api2'), exists => {
            if (!exists) {
                fs.mkdirSync(path.resolve(process.cwd() + '/src/', 'api2'))
            }
            handleData(swaggerjson)
        })

        // fs.writeFile(
        //   path.resolve(__dirname, "swagger.json"),
        //   JSON.stringify(swaggerjson),
        //   (err, fd) => {
        //     if (err) {
        //       if (err.code === "EEXIST") {
        //         console.error("文件已存在");
        //         return;
        //       }
        //       throw err;
        //     } else {
        //       console.log("ENUM文件写入完成");
        //     }
        //   }
        // );
    },
    res => {
        console.log('swagger站点发生错误')
    }
)

// var swaggerfile = fs.readFileSync(path.resolve(__dirname, './swagger.json'))

// var swaggerjson2 = JSON.parse(swaggerfile)

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
    Object: 'object',
}
// handleData(swaggerjson2)
function handleData(swaggerjson) {
    var definitions = swaggerjson.definitions
    var paths = swaggerjson.paths

    /** */
    var apis = {}
    /** 请求类型领域对象 */
    var requestrefs = {}
    /** 响应类型领域对象 */
    var responserefs = {}

    if (paths) {
        let keys = Object.keys(paths)

        keys.map(key => {
            /** 方法类型 */
            let apitype = paths[key].post ? 'post' : 'get'
            let appinfo = paths[key][apitype]
            /** 方法描述 */
            let summary = appinfo.summary
            /** api唯一ID? 后续可能用来判断接口变更 */
            let apiid = appinfo.operationId
            /** api所属模块 */
            let modulename = appinfo.tags[0]
            let name = parseName(key)
            let simple = false
            let requestTypes = []
            let responsTypes = []
            /** 参数 */
            let params = appinfo.parameters.map(param => {
                if (!param.schema) {
                    simple = true
                } else {
                    /** 保存对应类型的领域 */
                    requestrefs[parseName(param.schema.$$ref)] = modulename

                    updateApiMap([getDeepResponseType(param.schema.$$ref)], apiMap, modulename)
                    requestTypes.push(parseName(param.schema.$$ref))
                    let reftypes = getDeepParamtype(param.schema.properties)
                    requestTypes = requestTypes.concat(reftypes)
                    updateApiMap(reftypes, apiMap, modulename)
                }
                let requestType = simple ? typeEnmu[param.type] : parseName(param.schema.$$ref) /** 是否复杂类型 */

                //  特殊处理 X-CSRF-TOKEN
                let obj = {
                    desc: simple ? param.name + '' + param.description || '缺失' : param.schema.description,
                    name: param.name === 'X-CSRF-TOKEN' ? 'ToKen' : param.name /** 参数类型   */,
                    type: requestType,
                    ref: simple ? '' : param.schema.$$ref,
                    required: param.required,
                    example: param.example || '',
                }
                if (obj.desc && obj.desc.indexOf('\r\n') > -1) {
                    obj.desc = obj.desc.replace(/\n/g, ' ').replace(/\r/g, ' ')
                }
                return obj
            })

            /** 回传 */
            let responsetype = ''
            if (!appinfo.responses || !appinfo.responses[200]) {
                console.error(key + ' 回传参数错误，请检查相关接口')
            }
            let response = appinfo.responses ? appinfo.responses[200] : {}

            if (response.schema) {
                responsetype = parseReftoType(response.schema.$$ref)
                responsTypes.push(getDeepResponseType(response.schema.$$ref))
                if (response.schema.properties) {
                    let typearr = getDeepParamtype(response.schema.properties)
                    updateApiMap(typearr, apiMap, modulename)
                    requestTypes = requestTypes.concat(typearr)
                }
            }

            if (!apis[modulename]) {
                apis[modulename] = []
            }
            requestTypes.map(type => {
                if (definitions[type]) {
                    if (!definitions[type].tags) {
                        definitions[type].tags = []
                    }
                    definitions[type].tags.push(modulename)
                }
            })
            responsTypes.map(type => {
                if (definitions[type]) {
                    if (!definitions[type].tags) {
                        definitions[type].tags = []
                    }
                    definitions[type].tags.push(modulename)
                }
            })

            apis[modulename].push({
                modulename,
                name,
                url: key,
                apitype,
                summary,
                apiid,
                simpletype: simple,
                param: params,
                responsetype,
                requestTypes: uniqueArr(requestTypes),
                responsTypes: uniqueArr(responsTypes),
            })
        })

        fs.mkdir(path.resolve(process.cwd() + '/src/api2/', 'apis'), err => {
            createfile(apis, './apis/')
        })
    }
    var obj = { PageResult: false, ResponseResult: false }
    if (definitions) {
        let keys = Object.keys(definitions)

        let resultobj = {
            base: [],
        }

        let enumarr = {}
        keys.map(key => {
            var typeinfo = definitions[key]
            var summary = typeinfo.description
            var properties = typeinfo.properties
            var propkeys = Object.keys(properties)
            let propArr = []
            propkeys.map(prop => {
                var propinfo = properties[prop]
                // 处理枚举相关  处理方式待定
                let Enum = propinfo.enum ? prop + 'Enum' : ''
                if (Enum) {
                    enumarr[Enum] = {
                        name: Enum,
                        summary: propinfo.description,
                        data: propinfo.enum,
                    }
                }

                var type = Enum
                    ? propinfo.enum.join('| ')
                    : propinfo.type === 'array'
                        ? !propinfo.items.$$ref
                            ? propinfo.items.enum
                                ? 'Array<' +
                                  (propinfo.items.enum.length > 10
                                      ? propinfo.items.enum.join('\n| ')
                                      : propinfo.items.enum.join(' |')) +
                                  '>'
                                : typeEnmu[propinfo.items.type] + '[]'
                            : parseReftoType(propinfo.items.$$ref).indexOf('<') === -1
                                ? parseReftoType(propinfo.items.$$ref) + '[]'
                                : 'Array<' + parseReftoType(propinfo.items.$$ref) + '>'
                        : !propinfo.$$ref
                            ? typeEnmu[propinfo.type]
                            : parseReftoType(propinfo.$$ref)

                propArr.push({
                    name: prop,
                    summary: propinfo.description,
                    type: type,
                    required: false, //暂时 全部u默认为false
                })
            })

            if (key.match(/ResponseResult/)) {
                if (!obj.ResponseResult) {
                    obj.ResponseResult = true
                    propArr = []
                    propkeys.map(prop => {
                        var propinfo = properties[prop]
                        propArr.push({
                            name: prop,
                            summary: propinfo.description,
                            type: prop === 'data' ? 'T' : typeEnmu[propinfo.type],
                        })
                    })
                    resultobj.base.push({
                        name: 'ResponseResult<T>',
                        summary: '返回参数泛型',
                        required: true,
                        propArr,
                    })
                }
            } else if (key.match(/PageResult/)) {
                if (!obj.PageResult) {
                    obj.PageResult = true
                    propArr = []
                    propkeys.map(prop => {
                        var propinfo = properties[prop]
                        propArr.push({
                            name: prop,
                            summary: propinfo.description,
                            required: true,
                            type: prop === 'list' ? 'T' : typeEnmu[propinfo.type],
                        })
                    })
                    resultobj.base.push({
                        name: 'PageResult<T>',
                        summary: '返回参数泛型',
                        propArr,
                    })
                }
            } else {
                if (!typeinfo.tags) {
                    typeinfo.tags = ['base']
                }
                typeinfo.tags = uniqueArr(typeinfo.tags)
                if (typeinfo.tags.length > 1) {
                    typeinfo.tags = ['base']
                }
                var modulename = typeinfo.tags[0]
                if (!resultobj[modulename]) {
                    resultobj[modulename] = []
                }

                resultobj[modulename].push({
                    name: parseTemplate(key),
                    key,
                    tags: typeinfo.tags,
                    summary,
                    propArr,
                })
            }
        })
        console.log(apiMap)
        fs.mkdir(path.resolve(process.cwd() + '/src/api2/', 'types'), err => {
            createTypefile(resultobj, './types/')
            // createEnumfile(enumarr, './types/', 'enum')
        })
    }
}

/** 处理多个模块都引用时  提取到公共模块的逻辑 */
function updateApiMap(types, Maps, modulename) {
    types.forEach(type => {
        type = parseName(type)
        type = getDeepResponseType(type)
        if (Maps[type] && Maps[type] != modulename) {
            Maps[type] = 'Base'
        } else {
            Maps[type] = modulename
        }
    })
}

/** 数组去重 */
function uniqueArr(arr) {
    let arr2 = []
    if (!arr) {
        return ['未设置']
    }
    arr.map(tag => {
        if (arr2.indexOf(tag) === -1) {
            arr2.push(tag)
        }
    })
    return arr2
}

function getRealType(ref) {
    let type = ref.split('/').reverse()[0]
    return type
}

function getDeepResponseType(ref) {
    var reg = /[\<]([\w]+[\<]*([\w]*)[\>]*)[\>]/

    var resarr = ref.match(reg)
    if (resarr) {
        resarr = resarr.filter(re => {
            return re
        })
        return resarr.reverse()[0]
    } else {
        return getRealType(ref)
    }
    return ''
}

function getDeepParamtype(properties) {
    let paramtype = []
    let keys = Object.keys(properties)
    keys.map(param => {
        var info = properties[param]
        if (info.$$ref) {
            paramtype.push(getRealType(info.$$ref))
            paramtype = paramtype.concat(getDeepParamtype(info.properties))
        }
        if (info.items && info.items.$$ref) {
            paramtype.push(getRealType(info.items.$$ref))
            paramtype = paramtype.concat(getDeepParamtype(info.items.properties))
        }
    })
    return paramtype
}
function createEnumfile(enums, dirname, filename) {
    fs.writeFile(path.resolve(__dirname, dirname + filename + '.ts'), generateEnumCode(enums), (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('文件已存在')
                return
            }
            throw err
        } else {
            console.log('ENUM文件写入完成')
        }
    })
}

function generateEnumCode(enums) {
    let codes = []
    let keys = Object.keys(enums)
    keys.map(en => {
        let info = enums[en]
        codes.push(`/** ${info.summary} */
enum ${info.name} {
  ${info.data
      .map(ee => {
          return info.name + ee
      })
      .join(',\n\t')}
}`)
    })
    return codes.join('\r\n')
}

/**
 * 创建各模块文件
 * @param apis 代码数组
 * @param dirname 目录名称
 */
function createTypefile(apis, dirname, filename) {
    // apis.map(api => {
    //   if (!api.tags || api.tags[0] === "未设置") {
    //     console.log(api.name);
    //   }
    // });
    var modules = Object.keys(apis)
    modules.map(module => {
        var filePath = path.resolve(process.cwd() + '/src/api2/', dirname + module + '.ts')
        var codes = generateTypeCode(apis[module])

        fs.writeFile(filePath, codes, (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('文件已存在')
                    return
                }
                throw err
            } else {
                // console.log("Type文件写入完成");Type
                console.log(module + 'Type模块写入完成')

                const option = tslint.Configuration.findConfiguration(null, filePath).results
                var linter = new tslint.Linter({ fix: true })
                linter.lint(filePath, codes, option)
                const result = linter.getResult()
                if (result.fixes.length) {
                    linter.applyFixes(filePath, codes, result.fixes)
                }
            }
        })
    })
}

/**
 * 创建各模块文件
 * @param apis 代码数组
 * @param dirname 目录名称
 */
function createfile(apis, dirname) {
    var modules = Object.keys(apis)
    modules.map(module => {
        var filePath = path.resolve(process.cwd() + '/src/api2/', dirname + module + '.ts')
        var codes = generateApiCode(apis[module], module)
        fs.writeFile(filePath, codes, (err, fd) => {
            if (err) {
                throw err
            } else {
                console.log(module + '模块写入完成')
                const option = tslint.Configuration.findConfiguration(path.join(process.cwd(), 'tslint.json'), filePath)
                    .results
                var linter = new tslint.Linter({ fix: true })
                linter.lint(filePath, codes, option)
                const result = linter.getResult()
                if (result.fixes.length) {
                    linter.applyFixes(filePath, codes, result.fixes)
                } else {
                    console.error('格式化错误')
                }
            }
        })
    })
}

/** 生成Type代码 */
function generateTypeCode(types) {
    //   var keys = Object.keys(types);
    var codes = []
    let refs = []
    types.map(typeinfo => {
        // var typeinfo = types[key];
        var propnum = typeinfo.propArr.map(p => {
            if (p.summary && (p.summary.indexOf('\r') > -1 || p.summary.indexOf('\n') > -1)) {
                p.summary = p.summary.replace(/\n/g, ' ').replace(/\r/g, ' ')
            }
            let type = p.type.match(/[\w]+/)[0]
            if (!typeEnmu[type] && apiMap[type] == 'Base') {
                refs.push(type)
            }
            if (p.summary) {
                p.summary = p.summary.replace(/\n/g, '').replace(/\r/g, '\n* ')
            }
            // TODO 参数暂时设置为全部选填  后端格式待定
            return ` /**${p.summary ? ' ' + p.summary : ''} */
  ${p.name}${p.required ? '' : '?'}: ${p.type}`
        })
        if (typeinfo.summary) {
            typeinfo.summary = typeinfo.summary.replace(/\n/g, '').replace(/\r/g, '\n* ')
        }

        codes.push(`/**
 *${typeinfo.summary ? ' ' + typeinfo.summary : ''}
 */
export interface ${typeinfo.name} {
 ${propnum.join('\n ')}
}
`)
    })
    refs = uniqueArr(refs)
    if (refs.length) {
        codes.unshift(`import { ${refs.join(',\n')} } from './base'`)
    }
    return codes.join('\r\n')
}

/** 生成Api代码 */
function generateApiCode(apis, module) {
    var pre = `import service from './../../api/net'
  import { AxiosPromise } from 'axios'`
    var responseType = []
    var commonType = []
    var codes = []
    codes.push(pre)
    apis.map(api => {
        /** 引入复杂类型的interface 处理 公共类型的引用关系 */

        let type = parseNametoType(api.responsetype)

        if (api.responsetype.indexOf('ResponseResult') !== -1) {
            commonType.push('ResponseResult')
        }
        if (api.responsetype.indexOf('ResponseResult') !== -1) {
            commonType.push('PageResult')
        }
        if (apiMap[type] == 'Base') {
            commonType.push(type)
        } else if (responseType.indexOf(type) === -1 && !typeEnmu[type] && type) {
            responseType.push(type)
        }
        // 超过120字时换行的警告未消除 留用
        var linelen = 0
        // 生成 形参的类型拼接
        let paramDesc = api.param.length
            ? api.param
                  .map(param => {
                      if (responseType.indexOf(param.type) === -1 && !typeEnmu[param.type] && param.type) {
                          responseType.push(param.type)
                      }
                      return param.name + ': ' + param.type
                  })
                  .join(', ')
            : ' '
        // 生成 参数的注释拼接
        let paramSum = api.param.length
            ? api.param
                  .map(param => {
                      if (responseType.indexOf(param.type) === -1 && !typeEnmu[param.type] && param.type) {
                          responseType.push(param.type)
                      }
                      return '* @param ' + param.name + ' ' + param.type + ' ' + param.desc
                  })
                  .join('\n')
            : ''

        // 生成 API 参数拼接
        var paramToken = ''
        if (api.param.length) {
            if (api.apitype == 'get') {
                paramToken = `, {params: { ${api.param.map(param => param.name).join(', ')} }}`
            } else {
                paramToken =
                    api.param.length == 1
                        ? ', ' + api.param[0].name
                        : `, {${api.param.map(param => param.name).join(', ')}}`
            }
        }
        api.summary = api.summary.replace(/\n/g, ' ').replace(/\r/g, ' ')
        let subtype = api.responsetype
        if (api.responsetype.indexOf('PageResult') > -1) {
            subtype = subtype.replace(/\>\>/, '[]>>')
        }
        codes.push(`
/**${api.summary ? ' ' + api.summary : ''}${paramSum ? '\n ' + paramSum + '\n */' : ' */'}
export const ${api.name} = (${paramDesc}): AxiosPromise<${subtype || null}> => {
    return service.${api.apitype}('${api.url}'${paramToken})
}`)
    })

    if (responseType.length) {
        codes.unshift(`import {
  ${responseType.join(',\n')}
} from './../types/${module}'`)
    }
    commonType = uniqueArr(commonType)
    if (commonType.length) {
        codes.unshift(`import {
    ${commonType.join(',\n\t')}
} from './../types/base'`)
    }
    return codes.join('\r\n') + '\n'
}

function parseName(name) {
    var endtype = name.split('/').reverse()[0]
    if (endtype.indexOf('[')) {
        // 将#/definitions/ResponseResult[Int32] 转换成 ResponseResult<number>
        endtype = endtype.replace(/\[/g, '<').replace(/\]/g, '>')
        endtype
            .replace(/(List)\<(\w+)/, '$2[]')
            .replace('String<>', 'string[]')
            .replace('Int32', 'number')
            .replace('Int64', 'number')
            .replace('DateTime', 'Date')
            .replace('String', 'string')
            .replace('Object', 'object')
            .replace('Boolean', 'boolean')
    }
    return endtype
}
/** 将ref对应链接转换为对应类型，无关泛型 */
function parseReftoType(ref) {
    var endtype = ref.split('/').reverse()[0]
    if (endtype.indexOf('[')) {
        // 将#/definitions/ResponseResult[Int32] 转换成 ResponseResult<number>
        endtype = endtype.replace(/\[/g, '<').replace(/\]/g, '>')
        endtype = endtype
            .replace(/(List)\<(\w+)\>/, '$2[]')
            .replace('String<>', 'string[]')
            .replace('Int32', 'number')
            .replace('Int64', 'number')
            .replace('DateTime', 'Date')
            .replace('Object', 'object')
            .replace('String', 'string')
            .replace('Boolean', 'boolean')
        endtype = handleGenericStr(endtype)
    }
    return endtype
}

/** 将ref对应链接转换为具体对应类型，无关泛型 */
function parseNametoType(ref) {
    if (!ref) {
        return ''
    }
    var endtype = ref.match(/\<(\w+)\>/)
    if (!endtype) {
        if (ref.match(/PageResult/)) {
            if (ref.indexOf('[') !== -1) {
                var end2 = ref.match(/<(\w+\[\])/)
                return end2 ? end2[1] : 'PageResult'
            } else {
                return 'PageResult'
            }
        } else if (ref.match(/ResponseResult/)) {
            if (ref.indexOf('[') !== -1) {
                var end2 = ref.match(/<(\w+)\[\]/)
                return end2 ? end2[1] : 'ResponseResult'
            } else {
                return 'ResponseResult'
            }
        } else {
            return ref
        }
        return ref
    }
    if (endtype.length == 2) {
        return endtype[1]
    }
    //   return "any";
}

function handleGenericStr(str) {
    if (str.indexOf(',') > -1) {
        str = str.replace(/,/g, ', ')
    }
    return str
}
function parseTemplate(ref) {
    var endtype = ref.split('/').reverse()[0]
    if (endtype.indexOf('[')) {
        let i = 1
        // 将#/definitions/ResponseResult[Int32] 转换成 ResponseResult<number>
        endtype = endtype.replace(/\[/g, '<').replace(/\]/g, '>')
        endtype = endtype
            .replace(/(List)\<(\w+)\>/, '$2[]' + i++)
            .replace('Int32', 'T' + i++)
            .replace('Int64', 'T' + i++)
            .replace('DateTime', 'T' + i++)
            .replace('String', 'T' + i++)
            .replace('Boolean', 'T' + i++)
        endtype = handleGenericStr(endtype)
    }
    return endtype
}
