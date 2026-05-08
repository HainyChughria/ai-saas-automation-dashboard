import { useState } from "react"
import axios from "axios"

function PublicLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await axios.post("http://localhost:5000/api/leads", formData)

      setSuccess(true)

      setFormData({
        name: "",
        email: "",
        message: ""
      })

    } catch (error) {
      console.error("Lead submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Contact Our Team
        </h1>

        <p className="text-gray-500 mb-8">
          Fill out the form below and our team will get back to you shortly.
        </p>

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
            Lead submitted successfully 
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition"
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default PublicLeadForm