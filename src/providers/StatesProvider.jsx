import { createContext, useState } from "react";


export const StatesContext = createContext(null)

export function StatesProvider({ children }) {
  const [tableState, setTableState] = useState(0)
  const [diagramState, setDiagramState] = useState(0)
  const [modificationState, setModificationState] = useState(0)

  const updateTable = () => setTableState(prev => prev + 1)
  const updateDiagram = () => setDiagramState(prev => prev + 1)
  const updateModification = () => setModificationState(prev => prev + 1)

  return (
    <StatesContext.Provider
      value={{
        tableState, updateTable,
        diagramState, updateDiagram,
        modificationState, updateModification
      }}
    >
      {children}
    </StatesContext.Provider>
  )

}