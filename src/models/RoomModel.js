import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  size: {
    type: number,
    required: [true, 'size is required']
  }
})
