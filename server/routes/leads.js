import express from "express"
import Lead from "../models/Lead.js"

const router = express.Router()

// GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" })
  }
})

// POST new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body

    const aiReply = `Hi ${name}, thanks for reaching out! Our team will contact you soon.`

    const newLead = new Lead({
      name,
      email,
      message,
      aiReply
    })

    await newLead.save()
    res.json(newLead)

  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" })
  }
})

// ✅ UPDATE STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json(updatedLead)
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" })
  }
})

// GET analytics
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

export default router