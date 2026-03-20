import { useState, useEffect } from "react"
import axios from "axios"

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    totalAIResponses: 0,
    conversionRate: 0
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads/analytics")
        setAnalytics(res.data)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      }
    }

    fetchAnalytics()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Leads */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">Total Leads</p>
          <h3 className="text-3xl font-bold">{analytics.totalLeads}</h3>
        </div>

        {/* AI Replied */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">AI Replied</p>
          <h3 className="text-3xl font-bold">{analytics.totalAIResponses}</h3>
        </div>

        {/* Conversion Rate */}
        <div className="p-6 rounded-xl bg-slate-100 shadow-lg">
          <p className="text-gray-500 mb-2">Response Rate</p>
          <h3 className="text-3xl font-bold">{analytics.conversionRate}%</h3>
        </div>

      </div>
    </div>
  )
}

export default Dashboard