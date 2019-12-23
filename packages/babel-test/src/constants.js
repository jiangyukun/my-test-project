const {sepLine} = require('./utils')

const projectRoot = 'D:\\2019\\Porjects\\ems2.0-mm-view'

let modelPath = [
  {path: sepLine('models', 'customer-list.ts'), ns: 'c_list'},
  {path: sepLine('models', 'customer-station-list.ts'), ns: 'c_station_list'},

  {path: sepLine('models', 'batch-addition.ts'), ns: 'r_e_batch_addition'},
  {path: sepLine('models', 'data-item-view.ts'), ns: 'r_e_data_item'},
  {path: sepLine('models', 'parameter-library.ts'), ns: 'r_e_parameter_library'},
  {path: sepLine('models', 'rights-equipment-list.ts'), ns: 'r_e_equipment_list'},

  {path: sepLine('rights-menu', 'model.ts'), ns: 'r_m'},

  {path: sepLine('models', 'menu-select.ts'), ns: 'r_o_menu_select'},
  {path: sepLine('models', 'rights-role-list.ts'), ns: 'r_o_role_list'},

  {path: sepLine('models', 'rights-station.ts'), ns: 'r_u_station'},
  {path: sepLine('models', 'rights-user-list.tsx'), ns: 'r_u_user_list'}
]

let global2Path = [
  {path: sepLine('models', 'global2.ts'), ns: 'global2'},
]

module.exports = {
  projectRoot,
  modelPath,
  global2Path
}