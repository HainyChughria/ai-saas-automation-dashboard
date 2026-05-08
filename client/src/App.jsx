import { Routes, Route, Link } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import Settings from "./pages/Settings"
import PublicLeadForm from "./pages/PublicLeadForm"

function App() {
  return (
    <Routes>

      {/* Public Customer Form */}
      <Route path="/lead-form" element={<PublicLeadForm />} />

      {/* Dashboard Layout */}
      <Route
        path="/*"
        element={
          <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">

              <h1 className="text-2xl font-bold mb-10">
                AI SaaS
              </h1>

              <nav className="flex flex-col gap-4">

                <Link
                  to="/"
                  className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/leads"
                  className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
                >
                  Leads
                </Link>

                <Link
                  to="/settings"
                  className="hover:bg-slate-800 px-4 py-3 rounded-xl transition"
                >
                  Settings
                </Link>

              </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>

            </main>

          </div>
        }
      />

    </Routes>
  )
}

export default App