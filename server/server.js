import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import leadsRoute from "./routes/leads.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 🚀"))
.catch(err => console.log(err))

// Routes
app.use("/api/leads", leadsRoute)

app.get("/", (req, res) => {
  res.send("API is running 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})