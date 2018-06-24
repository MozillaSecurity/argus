'use strict'
const path = require('path')
const bodyparser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const history = require('connect-history-api-fallback')

const logger = require('./logger/express')

module.exports.init = (app, conf) => {
  const encodeGzip = contentType => (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', contentType)
    next()
  }

  app.set('json spaces', 4)

  app.use(compression({
    level: 9,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false
      }
      return compression.filter(req, res)
    }
  }))

  app.use(helmet())

  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackConfig = require('../../build/webpack.config.dev')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }))
  }

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })

  app.use(require('express').static(path.join(__dirname, 'public')))

  // TODO (posidron): That seems to conflicts with history rewrite.
  app.get('*.js', encodeGzip('text/javascript'))
  app.get('*.css', encodeGzip('text/css'))

  // Required for the Auth0 callback.
  app.use(history({
    disableDotRule: true,
    verbose: true,
    index: '/'
  }))

  app.use(require('express').static(path.join(__dirname, 'public')))

  app.use(bodyparser.urlencoded({ extended: false }))
  app.use(bodyparser.json())

  // Logger to capture all requests and output them to the console.
  app.use(logger.expressLogger)

  // Add routes to middleware.
  app.use('/api/v1', require('./api/routes/repo'))
  // app.use('/private/kue-ui', require('kue').app)

  // Logger to capture any top-level errors and output JSON diagnostic info.
  app.use(logger.expressErrorLogger)

  // Catch 404 and forward to error handler.
  app.use(function (req, res, next) {
    const err = new Error(`${req.originalUrl} was not found.`)
    err.status = 404
    next(err)
  })

  if (conf.get('env') === 'development' || conf.get('env') === 'test') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({error: {message: err.message}})
    })
  }
  if (conf.get('env') === 'production') {
    // Production error handler.
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({message: err.message, error: {}})
    })
  }
}
