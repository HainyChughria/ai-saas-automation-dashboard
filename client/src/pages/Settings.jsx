function Settings() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl shadow-lg space-y-6">

        <div>
          <label className="block mb-2 font-medium">Enable Email Notifications</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Enable Auto AI Replies</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div>
          <label className="block mb-2 font-medium">CRM Integration</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>

      </div>
    </div>
  )
}

export default Settings