let a = {
  'mode': 'development',
  'externals': {'d3': 'window.d3', 'echarts': 'window.echarts'},
  'devtool': 'cheap-module-source-map',
  'node': {
    'setImmediate': false,
    'process': 'mock',
    'dgram': 'empty',
    'fs': 'empty',
    'net': 'empty',
    'tls': 'empty',
    'child_process': 'empty'
  },
  'output': {
    'path': '/Users/wangji/web2022/ems2.0-mm-view/dist',
    'filename': '[name].js',
    'chunkFilename': '[name].async.js',
    'publicPath': '/',
    'pathinfo': true
  },
  'resolve': {
    'symlinks': true,
    'alias': {
      'dva': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/dva',
      'dva-loading': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/dva-loading/dist/index.js',
      'path-to-regexp': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/path-to-regexp/index.js',
      'object-assign': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/object-assign/index.js',
      'react': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/react',
      'react-dom': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/react-dom',
      'react-router': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/react-router',
      'react-router-dom': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/react-router-dom',
      'react-router-config': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/react-router-config',
      'history': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-history',
      '@': '/Users/wangji/web2022/ems2.0-mm-view/src/',
      '@tmp': '/Users/wangji/web2022/ems2.0-mm-view/src/pages/.umi',
      '@@': '/Users/wangji/web2022/ems2.0-mm-view/src/pages/.umi',
      'umi': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi',
      'regenerator-runtime': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/node_modules/regenerator-runtime'
    },
    'extensions': ['.web.js', '.wasm', '.mjs', '.js', '.web.jsx', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx', '.json'],
    'modules': ['node_modules', '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/node_modules', '/Users/wangji/web2022/ems2.0-mm-view/node_modules/']
  },
  'resolveLoader': {'modules': ['node_modules', '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/node_modules']},
  'module': {
    'rules': [{
      'exclude': [{}, {}, {}, {}],
      'use': [{
        'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-url-pnp-loader/dist/cjs.js',
        'options': {'limit': 10000, 'name': 'static/[name].[hash:8].[ext]'}
      }]
    },
      {'test': {}, 'type': 'javascript/auto', 'include': ['/Users/wangji/web2022/ems2.0-mm-view']},
      {
        'test': {},
        'include': ['/Users/wangji/web2022/ems2.0-mm-view'],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-loader/lib/index.js',
          'options': {
            'presets': [['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/index.js', {
              'targets': {
                'chrome': 49,
                'firefox': 64,
                'safari': 10,
                'edge': 13,
                'ios': 10
              }, 'env': {'useBuiltIns': 'entry', 'corejs': 2}
            }]],
            'plugins': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js', ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-plugin-named-asset-import/index.js', {'loaderMap': {'svg': {'ReactComponent': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'}}}]],
            'sourceType': 'unambiguous',
            'cacheDirectory': true,
            'babelrc': false,
            'customize': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/webpack-overrides.js'
          }
        }]
      },
      {
        'test': {},
        'include': ['/Users/wangji/web2022/ems2.0-mm-view'],
        'exclude': [{}],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-loader/lib/index.js',
          'options': {
            'presets': [['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/index.js', {
              'targets': {
                'chrome': 49,
                'firefox': 64,
                'safari': 10,
                'edge': 13,
                'ios': 10
              }, 'env': {'useBuiltIns': 'entry', 'corejs': 2}
            }]],
            'plugins': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js', ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-plugin-named-asset-import/index.js', {'loaderMap': {'svg': {'ReactComponent': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'}}}]],
            'sourceType': 'unambiguous',
            'cacheDirectory': true,
            'babelrc': false,
            'customize': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/webpack-overrides.js'
          }
        }]
      }, {
        'test': {},
        'include': ['/Users/wangji/web2022/ems2.0-mm-view'],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-loader/lib/index.js',
          'options': {
            'presets': [['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/index.js', {
              'targets': {
                'chrome': 49,
                'firefox': 64,
                'safari': 10,
                'edge': 13,
                'ios': 10
              }, 'env': {'useBuiltIns': 'entry', 'corejs': 2}
            }]],
            'plugins': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js', ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-plugin-named-asset-import/index.js', {'loaderMap': {'svg': {'ReactComponent': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'}}}]],
            'sourceType': 'unambiguous',
            'cacheDirectory': true,
            'babelrc': false,
            'customize': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/webpack-overrides.js'
          }
        }]
      }, {
        'test': {},
        'include': [null],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-loader/lib/index.js',
          'options': {
            'presets': [['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/index.js', {
              'targets': {
                'chrome': 49,
                'firefox': 64,
                'safari': 10,
                'edge': 13,
                'ios': 10
              }, 'env': {'useBuiltIns': 'entry', 'corejs': 2}
            }]],
            'plugins': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js', ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-plugin-named-asset-import/index.js', {'loaderMap': {'svg': {'ReactComponent': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'}}}]],
            'sourceType': 'unambiguous',
            'cacheDirectory': true,
            'babelrc': false,
            'customize': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/webpack-overrides.js'
          }
        }]
      }, {
        'test': {},
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-loader/lib/index.js',
          'options': {
            'presets': [['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/index.js', {
              'targets': {
                'chrome': 49,
                'firefox': 64,
                'safari': 10,
                'edge': 13,
                'ios': 10
              }, 'env': {'useBuiltIns': 'entry', 'corejs': 2}
            }]],
            'plugins': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js', ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-plugin-named-asset-import/index.js', {'loaderMap': {'svg': {'ReactComponent': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'}}}]],
            'sourceType': 'unambiguous',
            'cacheDirectory': true,
            'babelrc': false,
            'customize': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/babel-preset-umi/lib/webpack-overrides.js'
          }
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/ts-loader/index.js',
          'options': {'configFile': '/Users/wangji/web2022/ems2.0-mm-view/tsconfig.json', 'transpileOnly': true}
        }]
      }, {
        'test': {},
        'exclude': [{}],
        'use': [{'loader': 'graphql-tag/loader'}]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/less-loader/dist/cjs.js',
          'options': {
            'modifyVars': {'primary-color': '#3d7eff', 'table-header-bg': '#f6f6f6'},
            'javascriptEnabled': true
          }
        }]
      }, {
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'exclude': [null],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {
            'importLoaders': 1,
            'sourceMap': true,
            'modules': true,
            'localIdentName': '[name]__[local]___[hash:base64:5]'
          }
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'include': [{}],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'exclude': [null],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {
            'importLoaders': 1,
            'sourceMap': true,
            'modules': true,
            'localIdentName': '[name]__[local]___[hash:base64:5]'
          }
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/less-loader/dist/cjs.js',
          'options': {
            'modifyVars': {'primary-color': '#3d7eff', 'table-header-bg': '#f6f6f6'},
            'javascriptEnabled': true
          }
        }]
      }, {
        'test': {},
        'include': [{}],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/less-loader/dist/cjs.js',
          'options': {
            'modifyVars': {'primary-color': '#3d7eff', 'table-header-bg': '#f6f6f6'},
            'javascriptEnabled': true
          }
        }]
      }, {
        'test': {},
        'exclude': [null],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {
            'importLoaders': 1,
            'sourceMap': true,
            'modules': true,
            'localIdentName': '[name]__[local]___[hash:base64:5]'
          }
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'include': [{}],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'exclude': [null],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {
            'importLoaders': 1,
            'sourceMap': true,
            'modules': true,
            'localIdentName': '[name]__[local]___[hash:base64:5]'
          }
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }, {
        'test': {},
        'include': [{}],
        'use': [{
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/mini-css-extract-plugin/dist/loader.js',
          'options': {'publicPath': '/', 'hmr': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/css-loader-1/index.js',
          'options': {'importLoaders': 1, 'sourceMap': true}
        }, {
          'loader': '/Users/wangji/web2022/ems2.0-mm-view/node_modules/postcss-loader/src/index.js',
          'options': {'ident': 'postcss'}
        }]
      }]
  },
  'optimization': {'splitChunks': {'chunks': 'async', 'name': 'vendors'}, 'runtimeChunk': false},
  'plugins': [{
    'options': {
      'filename': '[name].css',
      'chunkFilename': '[name].chunk.css'
    }
  }, {
    'definitions': {
      'process.env': {'NODE_ENV': '"development"'},
      'process.env.BASE_URL': '"/"',
      '__IS_BROWSER': 'true',
      '__UMI_HTML_SUFFIX': 'false'
    }
  }, {
    'profile': false,
    'modulesCount': 500,
    'showEntries': false,
    'showModules': true,
    'showActiveModules': true,
    'options': {'name': 'webpack', 'color': 'green', 'reporters': ['fancy'], 'reporter': null},
    'reporters': [{}]
  }, {
    'patterns': [{'from': './src/static/echarts.min.js', 'to': './echarts.min.js'}],
    'options': {}
  }, {
    'patterns': [{'from': './src/static/d3.v5.min.js', 'to': './d3.v5.min.js'}],
    'options': {}
  }, {}, {
    'compilationSuccessInfo': {},
    'shouldClearConsole': false,
    'formatters': [null, null, null],
    'transformers': [null, null, null]
  }, {'options': {}, 'fullBuildTimeout': 200, 'requestTimeout': 10000}, {}, {
    'options': {},
    'logger': {},
    'pathCache': {},
    'fsOperations': 0,
    'primed': false
  }],
  'entry': {'umi': ['/Users/wangji/web2022/ems2.0-mm-view/node_modules/af-webpack/lib/webpackHotDevClient.js', '/Users/wangji/web2022/ems2.0-mm-view/src/pages/.umi/umi.js']}
}