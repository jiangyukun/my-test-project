const path = require('path')

const {global2Path, modelPath, tsxPath} = require('./constants')
const {projectRoot} = require('./constants')

const pagesRoot = path.join(projectRoot, 'src/pages')
const srcRoot = path.join(projectRoot, 'src')
const layoutsRoot = path.join(projectRoot, 'src/layouts')
const modelsRoot = path.join(projectRoot, 'src/models')

const convertEffects = require('./convert-effects')
const convertGetState = require('./convert-getState')
const convertUpdateState = require('./convert-updateState')
const convertUpdateQuery = require('./convert-updateQuery')
const convertCallService = require('./convert-call-service')
const upgradeConnect = require('./upgrade-connect')
const separate = require('./separate-columns')

// convertEffects(modelsRoot, global2Path)
// convertGetState(modelsRoot, global2Path)
// convertUpdateState(modelsRoot, global2Path)
// convertUpdateQuery(modelsRoot, global2Path)
// convertCallService(modelsRoot, global2Path)

// upgradeConnect(pagesRoot, tsxPath)
separate(pagesRoot, tsxPath)

