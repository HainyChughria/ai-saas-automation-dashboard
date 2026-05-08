import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { LeadsContext } from "../context/LeadsContext"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts"

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    totalAIResponses: 0,
    conversionRate: 0
  })

  const [recentLeads, setRecentLeads] = useState([])

  const { leadsChanged } = useContext(LeadsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await axios.get("http://localhost:5000/api/leads/analytics")
        setAnalytics(analyticsRes.data)

        const leadsRes = await axios.get("http://localhost:5000/api/leads")
        setRecentLeads(leadsRes.data.slice(0, 5))
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [leadsChanged])

  // TIME AGO
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return Math.floor(seconds / 60) + " min ago"
    if (seconds < 86400) return Math.floor(seconds / 3600) + " hr ago"
    return Math.floor(seconds / 86400) + " days ago"
  }

  // STATUS UPDATE FUNCTION
  const updateStatus = async (id, currentStatus) => {
    let nextStatus = "CONTACTED"

    if (currentStatus === "NEW") nextStatus = "CONTACTED"
    else if (currentStatus === "CONTACTED") nextStatus = "CLOSED"

    try {
      await axios.patch(`http://localhost:5000/api/leads/${id}/status`, {
        status: nextStatus
      })

      // Update UI instantly
      setRecentLeads(prev =>
        prev.map(lead =>
          lead._id === id ? { ...lead, status: nextStatus } : lead
        )
      )

    } catch (error) {
      console.error("Status update failed")
    }
  }

  const pieData = [
    { name: "AI Responses", value: analytics.totalAIResponses },
    {
      name: "Pending",
      value: analytics.totalLeads - analytics.totalAIResponses
    }
  ]

  const barData = [
    { name: "Leads", value: analytics.totalLeads },
    { name: "AI Replies", value: analytics.totalAIResponses }
  ]

  const COLORS = ["#2563eb", "#e5e7eb"]

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-slate-800">Dashboard Overview</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <p className="text-gray-500">Total Leads</p>
          <h3 className="text-3xl font-semibold mt-2">{analytics.totalLeads}</h3>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <p className="text-gray-500">AI Responses</p>
          <h3 className="text-3xl font-semibold mt-2">{analytics.totalAIResponses}</h3>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <p className="text-gray-500">Conversion Rate</p>
          <h3 className="text-3xl font-semibold mt-2">{analytics.conversionRate}%</h3>
        </div>

      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Pie Chart */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Conversion Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Leads vs AI Replies</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Leads */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>

          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead._id} className="flex justify-between items-center border-b pb-2">

                <div>
                  <p className="font-medium text-slate-800">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                  <p className="text-xs text-gray-400">{timeAgo(lead.createdAt)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">

                  <span className={`text-xs px-3 py-1 rounded-full ${
                    lead.status === "NEW"
                      ? "bg-yellow-100 text-yellow-700"
                      : lead.status === "CONTACTED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {lead.status}
                  </span>

                  {lead.status !== "CLOSED" && (
                    <button
                      onClick={() => updateStatus(lead._id, lead.status)}
                      className="text-xs px-3 py-1 bg-slate-800 text-white rounded-md"
                    >
                      {lead.status === "NEW" ? "Mark Contacted" : "Mark Closed"}
                    </button>
                  )}

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard