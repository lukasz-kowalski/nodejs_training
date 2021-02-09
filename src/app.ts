import 'express-async-errors'
import express from 'express'

import { notFoundHandler, serverErrorHandler } from './error'

export const appFactory = (
  booksRouter: express.Router,
  corsMiddleware: express.Handler
): express.Application => {
  const app: express.Application = express()

  app.use(corsMiddleware)

  app.use(express.json())

  app.use(booksRouter)

  app.use(notFoundHandler)
  app.use(serverErrorHandler)

  return app
}
