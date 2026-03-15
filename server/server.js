import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Temporary in-memory storage
let leads = []

// Get all leads
app.get("/api/leads", (req, res) => {
  res.json(leads)
})

app.get("/", (req, res) => {
  res.send("API is running 🚀")
})

// Add new lead
app.post("/api/leads", (req, res) => {
  const { name, email } = req.body

  const newLead = {
    id: Date.now(),
    name,
    email,
    aiReply: `Hi ${name}, thanks for your interest! Our AI automation platform can help scale your business.`
  }

  leads.push(newLead)
  res.status(201).json(newLead)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})