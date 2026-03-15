import { useState, useEffect } from "react"

function Leads() {
  const [leads, setLeads] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // Fetch leads on load
  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  const addLead = async () => {
    if (!name || !email) return

    const res = await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    })

    const newLead = await res.json()
    setLeads([...leads, newLead])

    setName("")
    setEmail("")
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

        <button
          onClick={addLead}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Lead
        </button>
      </div>

      <div className="space-y-6">
        {leads.map((lead) => (
          <div key={lead.id} className="p-6 rounded-xl bg-slate-100 shadow-lg">
            <h3 className="text-xl font-semibold">{lead.name}</h3>
            <p className="text-gray-500 mb-4">{lead.email}</p>

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