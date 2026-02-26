import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        AI SaaS
      </h1>

      <div className="flex gap-4">
        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/leads" className={linkStyle("/leads")}>
          Leads
        </Link>

        <Link to="/settings" className={linkStyle("/settings")}>
          Settings
        </Link>
      </div>
    </nav>
  )
}

export default Navbar