import { useState } from "react"

function Leads({ leads, setLeads }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const addLead = () => {
    if (!name || !email) return

    const newLead = {
      name,
      email,
      aiReply: `Hi ${name}, thanks for your interest! Our AI automation platform can help you scale your business efficiently.`
    }

    setLeads([...leads, newLead])
    setName("")
    setEmail("")
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Leads</h2>

      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl mb-10 shadow-lg">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white dark:bg-slate-800"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white dark:bg-slate-800"
        />

        <button
          onClick={addLead}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Lead + Generate AI Reply
        </button>
      </div>

      <div className="space-y-6">
        {leads.map((lead, index) => (
          <div key={index} className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 shadow-lg">
            <h3 className="text-xl font-semibold">{lead.name}</h3>
            <p className="text-gray-500 mb-4">{lead.email}</p>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
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