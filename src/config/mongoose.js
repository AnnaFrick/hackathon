import mongoose from "mongoose"
import { logger } from "./logger.js"

export async function connectToDatabase(connectionString, retries = 10, delay = 6000) {
  // Set Mongoose options
  mongoose.set("strict", "throw")
  mongoose.set("strictQuery", true)

  const { connection } = mongoose

  // Bind connection events for logging
  connection.on("connected", () => logger.info("Mongoose connected to Mongo"))
  connection.on("disconnected", () => logger.info("Mongoose disconnected from Mongo"))
  connection.on("error", (err) => logger.error(`Mongoose connection error: ${err}`))

  // Retry logic with controlled attempts
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Attempting to connect to Mongo (Attempt ${attempt} of ${retries})`)
      await mongoose.connect(connectionString)
      logger.info("Successfully connected to Mongo")
      break // Exit the loop on successful connection
    } catch (error) {
      logger.error(`Connection attempt ${attempt} failed: ${error.message}`)

      if (attempt > retries) {
        logger.error("Maximum retry attempts reached. Could not connect to MongoDB.")
        throw Error("Could not connect to Mongo")
      }

      logger.info(`Retrying in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

export function cleanMongooseError(err) {
  return Object.values(err.errors)
    .map((o) => o.message)
    .join("\n")
}
