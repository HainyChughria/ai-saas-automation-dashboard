import mongoose from "mongoose"

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  aiReply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Lead", leadSchema)