import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import Settings from "./pages/Settings"

function App() {
  const [page, setPage] = useState("dashboard")
  const [leads, setLeads] = useState([])

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Layout */}
      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 h-screen bg-slate-100 p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-10">AI SaaS</h1>

          <div className="space-y-4">
            <button
              onClick={() => setPage("dashboard")}
              className="block w-full text-left hover:text-blue-500"
            >
              Dashboard
            </button>

            <button
              onClick={() => setPage("leads")}
              className="block w-full text-left hover:text-blue-500"
            >
              Leads
            </button>

            <button
              onClick={() => setPage("settings")}
              className="block w-full text-left hover:text-blue-500"
            >
              Settings
            </button>
          </div>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">

          {page === "dashboard" && <Dashboard leads={leads} />}
          {page === "leads" && <Leads leads={leads} setLeads={setLeads} />}
          {page === "settings" && <Settings />}

        </div>

      </div>
    </div>
  )
}

export default App