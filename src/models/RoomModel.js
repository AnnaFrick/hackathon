import mongoose from 'mongoose'
import { startTime } from 'pino-http'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  size: {
    type: number,
    required: [true, 'size is required']
  }
  startTime: {
    type: Date,
    default: startTime
  },
  endTime: {
    type: Date
  }
  booked: {
    type: Boolean,
    default: false
  }
})
