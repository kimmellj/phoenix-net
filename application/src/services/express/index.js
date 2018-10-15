import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send('Something broke!')
  })

  /* istanbul ignore next */
  if (env === 'production') {
    app.use(cors())
    app.use(compression())
  }

  if (env === 'development') {
    app.use(morgan('dev'))
  }
  app.use('/', express.static('../dashboard/dist/'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
