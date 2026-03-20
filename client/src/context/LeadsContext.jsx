import { createContext, useState } from "react"

export const LeadsContext = createContext()

export const LeadsProvider = ({ children }) => {
  const [leadsChanged, setLeadsChanged] = useState(0)

  return (
    <LeadsContext.Provider value={{ leadsChanged, setLeadsChanged }}>
      {children}
    </LeadsContext.Provider>
  )
}