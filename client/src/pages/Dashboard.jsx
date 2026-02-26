function Dashboard({ leads }) {
  const total = leads.length
  const aiReplies = leads.filter(l => l.aiReply).length
  const rate = total === 0 ? 0 : Math.round((aiReplies / total) * 100)

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 shadow-lg">
          <p className="text-gray-500">Total Leads</p>
          <h3 className="text-3xl font-bold">{total}</h3>
        </div>

        <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 shadow-lg">
          <p className="text-gray-500">AI Replies</p>
          <h3 className="text-3xl font-bold">{aiReplies}</h3>
        </div>

        <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 shadow-lg">
          <p className="text-gray-500">Engagement</p>
          <h3 className="text-3xl font-bold">{rate}%</h3>
        </div>

      </div>
    </div>
  )
}

export default Dashboard