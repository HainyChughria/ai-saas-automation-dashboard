import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import Settings from "./pages/Settings"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
