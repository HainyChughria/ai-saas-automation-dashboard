import { useState } from "react"

function Leads() {
  const [leads, setLeads] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const addLead = (e) => {
    e.preventDefault()
    if (!name || !email) return

    const newLead = {
      id: Date.now(),
      name,
      email,
      aiReply: ""
    }

    setLeads([...leads, newLead])
    setName("")
    setEmail("")
  }

  const generateReply = (id) => {
    const updatedLeads = leads.map((lead) => {
      if (lead.id === id) {
        return {
          ...lead,
          aiReply: `Hi ${lead.name}, thank you for your interest! Our AI system would love to connect with you soon.`
        }
      }
      return lead
    })

    setLeads(updatedLeads)
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Leads Management</h1>

      <form onSubmit={addLead} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Lead Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="email"
          placeholder="Lead Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Lead
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {leads.map((lead) => (
          <div key={lead.id} style={{
            backgroundColor: "#2c2c2c",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}>
            <p><strong>{lead.name}</strong></p>
            <p>{lead.email}</p>

            <button
              onClick={() => generateReply(lead.id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                cursor: "pointer"
              }}
            >
              Generate AI Reply
            </button>

            {lead.aiReply && (
              <p style={{ marginTop: "10px", color: "#4CAF50" }}>
                {lead.aiReply}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leads
