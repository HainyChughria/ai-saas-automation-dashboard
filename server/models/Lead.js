import mongoose from "mongoose"

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ""
  },
  aiReply: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["NEW", "CONTACTED", "CLOSED"],
    default: "NEW"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Lead", leadSchema)