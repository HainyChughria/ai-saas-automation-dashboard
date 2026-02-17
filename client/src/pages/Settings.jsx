import { useState } from "react"

function Settings() {
  const [apiKey, setApiKey] = useState("")
  const [autoReply, setAutoReply] = useState(false)

  const handleSave = () => {
    console.log("API Key:", apiKey)
    console.log("Auto Reply:", autoReply)
    alert("Settings Saved (Frontend Demo)")
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>AI Settings</h1>

      <div style={{
        marginTop: "30px",
        backgroundColor: "#2c2c2c",
        padding: "20px",
        borderRadius: "10px",
        width: "400px"
      }}>
        
        <div style={{ marginBottom: "20px" }}>
          <label>OpenAI API Key</label>
          <input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              display: "block",
              marginTop: "10px",
              padding: "10px",
              width: "100%"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={autoReply}
              onChange={() => setAutoReply(!autoReply)}
              style={{ marginRight: "10px" }}
            />
            Enable Automatic AI Replies
          </label>
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Save Settings
        </button>

      </div>
    </div>
  )
}

export default Settings
