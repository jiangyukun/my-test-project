const path = require('path')

const {global2Path} = require('./constants')
const {projectRoot} = require('./constants')

const pagesRoot = path.join(projectRoot, 'src/pages')
const srcRoot = path.join(projectRoot, 'src')
const layoutsRoot = path.join(projectRoot, 'src/layouts')
const modelsRoot = path.join(projectRoot, 'src/models')

const convertEffects = require('./convert-effects')
const convertGetState = require('./convert-getState')
const convertUpdateState = require('./convert-updateState')
const convertUpdateQuery = require('./convert-updateQuery')

convertEffects(modelsRoot, global2Path)

