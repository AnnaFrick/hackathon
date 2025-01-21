import "@lnu/json-js-cycle"
import httpContext from "express-http-context"
import express from "express"
import { connectToDatabase } from "./config/mongoose.js"
import http from "node:http"
import { logger } from "./config/winston.js"
import { morganLogger } from "./config/morgan.js"
import { router } from "./routes/router.js"

try {
  // Connect to MongoDB
  await connectToDatabase("mongo://mongo:27017/app")

  const BASE_URL = "/"

  const app = express()

  // Parse requests of the content type application/json.
  app.use(express.json())

  // Add the request-scoped context.
  // NOTE! Must be placed before any middle that needs access to the context!
  //       See https://www.npmjs.com/package/express-http-context.
  app.use(httpContext.middleware)

  // Use a morgan logger.
  app.use(morganLogger)

  // Register routes.
  app.use(BASE_URL, router)

  // Error handler.
  app.use((err, req, res, next) => {
    logger.error(err.message, { error: err })

    if (process.env.NODE_ENV === "production") {
      // Ensure a valid status code is set for the error.
      // If the status code is not provided, default to 500 (Internal Server Error).
      // This prevents leakage of sensitive error details to the client.
      if (!err.status) {
        err.status = 500
        err.message = http.STATUS_CODES[err.status]
      }

      // Send only the error message and status code to prevent leakage of
      // sensitive information.
      res.status(err.status).json({
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

    return res.status(err.status || 500).json(copy)
  })

  // Starts the HTTP server listening for connections.
  const server = app.listen(3000, () => {
    logger.info(`server: http://localhost:${server.address().port}`)
  })
} catch (err) {
  logger.error(err)
}
