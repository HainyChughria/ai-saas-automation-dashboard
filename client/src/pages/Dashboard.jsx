function Dashboard() {
  const stats = [
    { title: "Total Leads", value: 128 },
    { title: "Emails Sent", value: 96 },
    { title: "AI Replies Generated", value: 54 },
    { title: "Conversion Rate", value: "12%" }
  ]

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard Overview</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "30px"
      }}>
        {stats.map((item, index) => (
          <div key={index} style={{
            backgroundColor: "#2c2c2c",
            padding: "20px",
            borderRadius: "10px",
            color: "white"
          }}>
            <h3>{item.title}</h3>
            <p style={{ fontSize: "24px", marginTop: "10px" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
