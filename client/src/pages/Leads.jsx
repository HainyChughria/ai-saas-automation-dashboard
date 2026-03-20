import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { LeadsContext } from "../context/LeadsContext"

function Leads() {
  const [leads, setLeads] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("") // added message field

  const { setLeadsChanged } = useContext(LeadsContext) // context for live updates

  // Fetch leads on load
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads")
        setLeads(res.data)
      } catch (error) {
        console.error("Failed to fetch leads:", error)
      }
    }
    fetchLeads()
  }, [])

  const addLead = async () => {
    if (!name || !email) return

    try {
      const res = await axios.post("http://localhost:5000/api/leads", {
        name,
        email,
        message
      })

      const newLead = res.data
      setLeads([...leads, newLead])

      setName("")
      setEmail("")
      setMessage("")

      // Notify Dashboard to update
      setLeadsChanged(prev => prev + 1)
    } catch (error) {
      console.error("Failed to add lead:", error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Leads</h2>

      <div className="bg-slate-100 p-6 rounded-xl mb-10 shadow-lg">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded"
        />

        <input
          placeholder="Message (optional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full p-3 mb-4 rounded"
        />

        <button
          onClick={addLead}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Lead
        </button>
      </div>

      <div className="space-y-6">
        {leads.map(lead => (
          <div key={lead._id} className="p-6 rounded-xl bg-slate-100 shadow-lg">
            <h3 className="text-xl font-semibold">{lead.name}</h3>
            <p className="text-gray-500 mb-2">{lead.email}</p>
            {lead.message && <p className="mb-2">{lead.message}</p>}

            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium mb-2">AI Reply:</p>
              <p>{lead.aiReply}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leads