const path = require('path')

const {global2Path, modelPath} = require('./constants')
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
const convertPayload = require('./convert-payload')

// convertEffects(modelsRoot, global2Path)
// convertGetState(modelsRoot, global2Path)
// convertUpdateState(modelsRoot, global2Path)
// convertUpdateQuery(modelsRoot, global2Path)
// convertCallService(modelsRoot, global2Path)

convertPayload(pagesRoot, modelPath)

