const fileUtils = require('../utils/fileUtil')
const {sepLine} = require('../utils/utils')

let files = [
  'SimulatorPage.tsx',
  'simulator.scss',
  'Tools.tsx',
  'EditorUI.tsx',
  'BaseGraph.ts',
  'LeftArrow.ts',
  'Graph.ts',
  'ShapeSettingDialog.tsx',
  'Resizer.tsx',
  'SvgImage.tsx',
  'nav-bar.scss',
  'MenuNavigate.tsx',
  'graph.helper.ts',
  'Editor.tsx',
  'CellRendererForLook.ts',
  'GraphModelForLook.ts',
  'propertyList.ts',
  'shapeList.ts',
  'CellRenderer.ts',
  'ConnectionHandler.ts',
  'GraphHandler.ts',
  sepLine('login'),
  sepLine('index'),
  sepLine('dialog'),
  sepLine('style'),
]

let result = ''

fileUtils.reserveFile('D:\\2066\\Projects\\ies-cloud-simulator/view-react/src', (filePath) => {
  if (['.ts', '.tsx', '.scss'].find(item => filePath.indexOf(item) != -1)) {
    // console.log(filePath)
    let match = files.find(item => filePath.indexOf(item) != -1)
    if (match) {
      result += fileUtils.getFileContent(filePath)
    }
  }

})
// console.log(result.split('\n').length)
console.log(result)
