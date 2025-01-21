import mongoose from "mongoose"

// Reusable date validation function
const isValidDate = (value) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Regex for YYYY-MM-DD format
  if (!dateRegex.test(value)) return false

  // Further validation to ensure it's a valid calendar date
  const date = new Date(value)
  return !isNaN(date.getTime()) && value === date.toISOString().split("T")[0]
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  size: {
    type: Number,
    required: [true, "size is required"]
  },
  startTime: {
    type: String,
    validate: {
      validator: (value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
      message: (props) => `${props.value} is not a valid time! Use hh:mm format (e.g., 09:30 or 23:59).`
    },
    required: [true, "startTime is required"]
  },
  endTime: {
    type: String,
    validate: {
      validator: (value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
      message: (props) => `${props.value} is not a valid time! Use hh:mm format (e.g., 09:30 or 23:59).`
    },
    required: [true, "endTime is required"]
  },
  date: {
    type: String, // Use String to enforce the exact format
    required: [true, "date is required"],
    validate: {
      validator: isValidDate,
      message: (props) => `${props.value} is not a valid date! Use YYYY-MM-DD format.`
    }
  },
  booked: {
    type: Boolean,
    default: false
  }
})

export const RoomModel = mongoose.model("RoomModel", schema)
