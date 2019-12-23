const path = require('path')

const {global2Path, modelPath, tsxPath} = require('./constants')
const {projectRoot} = require('./constants')

const pagesRoot = path.join(projectRoot, 'src/pages')
const srcRoot = path.join(projectRoot, 'src')
const layoutsRoot = path.join(projectRoot, 'src/layouts')
const modelsRoot = path.join(projectRoot, 'src/models')

const payloadInfo = require('./info/payloadInfo')

payloadInfo(pagesRoot, tsxPath)
