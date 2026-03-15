import { useState, useEffect } from "react"

function Dashboard() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  const totalLeads = leads.length
  const aiReplied = leads.filter(lead => lead.aiReply).length
  const conversionRate =
    totalLeads === 0
      ? 0
      : Math.round((aiReplied / totalLeads) * 100)

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Leads */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">Total Leads</p>
          <h3 className="text-3xl font-bold">{totalLeads}</h3>
        </div>

        {/* AI Replied */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">AI Replied</p>
          <h3 className="text-3xl font-bold">{aiReplied}</h3>
        </div>

        {/* Conversion Rate */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">Response Rate</p>
          <h3 className="text-3xl font-bold">{conversionRate}%</h3>
        </div>

      </div>
    </div>
  )
}

export default Dashboard