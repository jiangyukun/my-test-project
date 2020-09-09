let path = require('path')

console.log(path.parse(__dirname + '/a.js'))


let a = [
  {
    category: 'analysis-query',
    api: [
      '/analysis',
      '/monitoring',
      '/performance',
      '/performance/day',
      '/performance/details',
      '/performance/hour',
      '/storage',
      '/storage/detail'
    ]
  },
  {category: 'batteryEfficiency', api: ['/curve']},
  {category: 'economicPerforMance', api: ['/top']},
  {category: 'economicPerformance', api: ['/curve']},
  {
    category: 'enums',
    api: [
      '',
      '/batteryClusters',
      '/crews',
      '/packs',
      '/packs/byEnergyUnitCode'
    ]
  },
  {category: 'login', api: ['', '/verification']},
  {category: 'menu', api: ['', '/jump']},
  {
    category: 'monographic-analysis',
    api: [
      '/battery-analysis',
      '/battery-analysis/:dataType',
      '/efficiency-analysis',
      '/efficiency-analysis/detail'
    ]
  },
  {
    category: 'on-line-monitoring',
    api: [
      '/system-wiring/alarm/byAnalog',
      '/system-wiring/history',
      '/system-wiring/realtime',
      '/system-wiring/title/byAnalog'
    ]
  },
  {
    category: 'operation-analysis',
    api: ['/chart', '/tree', '/type']
  },
  {
    category: 'operation-mangement',
    api: [
      '/electricity-bill',
      '/electricity-bill/detail',
      '/electricity-bill/indication',
      '/electricity-bill/list'
    ]
  },
  {
    category: 'overhaul-maintenance',
    api: [
      '/abnormal-config/list',
      '/event-management',
      '/event-management/by-alaram-level',
      '/event-management/detail',
      '/event-management/ignore',
      '/event-management/workOrder'
    ]
  },
  {
    category: 'overview',
    api: [
      '/info',
      '/runEnvironment',
      '/runStatus',
      '/selectStorage',
      '/temperature/byDevCodeAndPlace'
    ]
  },
  {category: 'report-management', api: ['']},
  {
    category: 'settings',
    api: [
      '/time',
      '/user/password',
      '/warning',
      '/warning/:id',
      '/warning/list'
    ]
  },
  {category: 'station-monitoring', api: ['/tree']},
  {category: 'users', api: ['/:id']}
]

let ddd = [
  'analysis-query', 'batteryEfficiency',
  'economicPerforMance', 'economicPerformance',
  'enums', 'login',
  'menu', 'monographic-analysis',
  'on-line-monitoring', 'operation-analysis',
  'operation-mangement', 'overhaul-maintenance',
  'overview', 'report-management',
  'settings', 'station-monitoring',
  'users'
]
