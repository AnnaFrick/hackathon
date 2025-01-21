import mongoose from "mongoose"

// Reusable time validation function
const isValidTime = (value) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  return timeRegex.test(value)
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  size: {
    type: Number,
    required: [true, "Size is required"]
  },
  startTime: {
    type: String,
    validate: {
      validator: isValidTime,
      message: (props) => `${props.value} is not a valid time! Use hh:mm format (e.g., 09:30 or 23:59).`
    }
  },
  endTime: {
    type: String,
    validate: {
      validator: isValidTime,
      message: (props) => `${props.value} is not a valid time! Use hh:mm format (e.g., 09:30 or 23:59).`
    }
  },
  booked: {
    type: Boolean,
    default: false
  }
})

export const RoomModel = mongoose.model("RoomModel", schema)
