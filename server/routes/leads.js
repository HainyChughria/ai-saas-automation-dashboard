import dotenv from "dotenv"
dotenv.config()

import express from "express"
import Lead from "../models/Lead.js"
import Groq from "groq-sdk"

const router = express.Router()

// Groq setup
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})


// GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" })
  }
})


// Analytics route
router.get("/analytics", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments()

    const totalAIResponses = await Lead.countDocuments({
      aiReply: { $ne: "" }
    })

    const conversionRate =
      totalLeads === 0
        ? 0
        : Math.round((totalAIResponses / totalLeads) * 100)

    res.json({
      totalLeads,
      totalAIResponses,
      conversionRate
    })

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" })
  }
})


// Update lead status
router.patch("/:id/status", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({
        error: "Lead not found"
      })
    }

    if (lead.status === "NEW") {
      lead.status = "CONTACTED"
    }

    else if (lead.status === "CONTACTED") {
      lead.status = "CLOSED"
    }

    await lead.save()

    res.json(lead)

  } catch (error) {
    res.status(500).json({
      error: "Failed to update lead status"
    })
  }
})


// POST new lead + REAL AI reply
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body

    // AI generation
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional SaaS customer support assistant."
        },
        {
          role: "user",
          content: `
Customer Name: ${name}

Customer Message:
${message}

Generate a short professional reply in 2-3 sentences.
`
        }
      ],

      model: process.env.GROQ_CHAT_MODEL
    })

    const aiReply =
      completion.choices[0]?.message?.content ||
      "Thank you for contacting us."

    // Save lead
    const newLead = new Lead({
      name,
      email,
      message,
      aiReply,
      status: "NEW"
    })

    await newLead.save()

    res.json(newLead)

  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Failed to generate AI reply"
    })
  }
})

export default router