const path = require('path')

const {projectRoot} = require('./constants')
const pagesRoot = path.join(projectRoot, 'src/pages')
const srcRoot = path.join(projectRoot, 'src')
const layoutsRoot = path.join(projectRoot, 'src/layouts')
const modelsRoot = path.join(projectRoot, 'src/models')

const convertEffects = require('./convert-effects')
const {global2Path} = require('./constants')

convertEffects(modelsRoot, global2Path)

