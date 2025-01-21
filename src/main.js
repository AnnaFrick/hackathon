import '@lnu/json-js-cycle'
import httpContext from 'express-http-context'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import cors from 'cors'
import { connectToDatabase } from './config/mongoose.js'
import http from 'node:http'
import { logger } from './config/winston.js'
import { morganLogger } from './config/morgan.js'
import { randomUUID } from 'node:crypto'
import { router } from './routes/router.js'

try {
  // Connect to MongoDB
  await connectToDatabase(process.env.DB_CONNECTION_STRING)

  const BASE_URL = process.env.BASE_URL || '/'

  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
      sameSite: 'strict'
    }
  }

  const app = express()

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  // Enable Cross Origin Resource Sharing (CORS) (https://www.npmjs.com/package/cors).
  app.use(cors())

  // Parse requests of the content type application/json.
  app.use(express.json())

  // Setup and use session middleware (https://github.com/expressjs/session)
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }
  app.use(session(sessionOptions))

  // Add the request-scoped context.
  // NOTE! Must be placed before any middle that needs access to the context!
  //       See https://www.npmjs.com/package/express-http-context.
  app.use(httpContext.middleware)

  // Use a morgan logger.
  app.use(morganLogger)

  // Middleware to be executed before the routes.
  app.use((req, res, next) => {
    // Add a request UUID to each request and store information about
    // each request in the request-scoped context.
    req.requestUuid = randomUUID()
    httpContext.set('request', req)

    next()
  })

  // Register routes.
  app.use(BASE_URL, router)

  // Error handler.
  app.use((err, req, res, next) => {
    logger.error(err.message, { error: err })

    if (process.env.NODE_ENV === 'production') {
      // Ensure a valid status code is set for the error.
      // If the status code is not provided, default to 500 (Internal Server Error).
      // This prevents leakage of sensitive error details to the client.
      if (!err.status) {
        err.status = 500
        err.message = http.STATUS_CODES[err.status]
      }

      // Send only the error message and status code to prevent leakage of
      // sensitive information.
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })

      return
    }

    // ---------------------------------------------------
    // ⚠️ WARNING: Development Environment Only!
    //             Detailed error information is provided.
    // ---------------------------------------------------

    // Deep copies the error object and returns a new object with
    // enumerable and non-enumrele properties (cyclical structures are handled).
    const copy = JSON.decycle(err, { includeNonEnumerableProperties: true })

    return res
      .status(err.status || 500)
      .json(copy)
  })

  // Starts the HTTP server listening for connections.
  const server = app.listen(process.env.PORT, () => {
    logger.info(`${process.env.NODE_ENV} Server running at http://localhost:${server.address().port}`)
    logger.info('Press Ctrl-C to terminate...')
  })
} catch (err) {
  logger.error(err)
  process.exitCode = 1
}
