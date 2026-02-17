import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#4CAF50" : "white",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal"
  })

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      backgroundColor: "#1f1f1f",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>AI SaaS</h2>

      <div style={{ display: "flex", gap: "30px" }}>
        <Link to="/" style={linkStyle("/")}>Dashboard</Link>
        <Link to="/leads" style={linkStyle("/leads")}>Leads</Link>
        <Link to="/settings" style={linkStyle("/settings")}>Settings</Link>
      </div>
    </nav>
  )
}

export default Navbar
