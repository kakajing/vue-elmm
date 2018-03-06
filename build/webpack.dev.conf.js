'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const axios = require('axios')
// const app = express()
// const apiRoutes = express.Router()
// app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      // 获取首页所有城市
      app.get('/api/getCities', (req, res) => {
        const url = 'https://www.ele.me/restapi/shopping/v1/cities'
        axios.get(url, {
          headers: {
            Host: 'www.ele.me',
            Referer: 'https://www.ele.me/'
          }}).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取首页默认地址
      app.get('/api/getGuess', (req, res) => {
          const url = 'https://www.ele.me/restapi/shopping/v1/cities/guess'
          axios.get(url, {
            headers: {
              Host: 'www.ele.me',
              Referer: 'https://www.ele.me/'
            }}).then((response) => {
            res.json(response.data)
          }).catch((e) => {
            console.log(e)
          })
        }),
      // 获取当前所在城市
      app.get('/api/getCurrentCity', (req, res) => {
        const url = 'https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/search', (req, res) => {
        const url = 'https://h5.ele.me/restapi/bgs/poi/search_poi_nearby'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取搜索地址
      app.get('/api/query', (req, res) => {
        const url = 'https://www.ele.me/restapi/v2/pois'
        axios.get(url, {
          headers: {
            Host: 'www.ele.me',
            Referer: 'https://www.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取msite页面地址信息
      app.get('/api/msiteAdress', (req, res) => {
        const url = 'https://www.ele.me/restapi/v1/pois/ww0pd91c0sc'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取导航食品类型列表
      app.get('/api/msiteFoodTypes', (req, res) => {
        const url = 'https://h5.ele.me/restapi/shopping/openapi/entries'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取msite页面商铺列表
      app.get('/api/shopList', (req, res) => {
        const url = 'https://h5.ele.me/restapi/shopping/v3/restaurants'
        axios.get(url, {
          headers: {
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取search页面搜索结果
      app.get('/api/searchRestaurant', (req, res) => {
        const url = 'https://h5.ele.me/restapi/shopping/v2/restaurants/search'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取food页面的 category 种类列表
      app.get('/api/foodCategory', (req, res) => {
        const url = 'https://h5.ele.me/restapi/shopping/v2/restaurant/category'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/msite/food/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      // 获取food页面的商铺列表
      app.get('/api/restaurants', (req, res) => {
        const url = 'https://h5.ele.me/restapi/shopping/v3/restaurants'
        axios.get(url, {
          headers: {
            Host: 'h5.ele.me',
            Referer: 'https://h5.ele.me/msite/food/'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    }

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
