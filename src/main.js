import cors from "cors"
import express from "express"
import { connectToDatabase } from "./config/mongoose.js"
import { logger } from "./config/logger.js"
import { pinoHttp } from "pino-http"
import { router } from "./routes/router.js"

const BASE_URL = "/"

const CORS_OPT = {
  origin: "*",
  methods: "*",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}

try {
  // Connect to the database
  await connectToDatabase("mongodb://mongo:27017/app")

  // Set up express
  const app = express()

  // Set up Cross-Origin Resource Sharing (CORS)
  app.use(cors(CORS_OPT))

  // Apply Pino HTTP middleware to log all incoming requests and responses
  app.use(pinoHttp({ logger }))
  logger.info("Pino HTTP logging enabled")

  // Parse JSON bodies
  app.use(express.json())
  logger.info("JSON body parsing enabled")

  // No trailing forward slash should be added to the path.
  // Must always start with a forward slash.
  // Register routes
  app.use(BASE_URL, router)

  // Custom error-handling middleware
  app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    const errorResponse = {
      status: statusCode,
      // Ensures no internal server errors are leaked to the client
      message: statusCode === 500 ? "Internal Server Error" : err.message
    }

    // Optionally include the stack trace when not in the production mode
    if (process.env.NODE_ENV !== "production" && err.stack) {
      errorResponse.stack = err.stack
    }

    res.status(statusCode).json(errorResponse)
  })

  const port = process.env.PORT || 4000
  app.listen(port, () => logger.info(`Server running at: http://localhost:${port}${BASE_URL}`))
} catch (err) {
  logger.error(err.message, { error: err })
  logger.info("Gracefully shutting down due to fatal error...")
  process.exit(1)
}
