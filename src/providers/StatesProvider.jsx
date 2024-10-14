import { createContext, useContext, useState } from "react";


const StatesContext = createContext(null)

export function StatesProvider({ children }) {
  const [tableState, setTableState] = useState(0)
  const [diagramState, setDiagramState] = useState(0)
  const [modificationState, setModificationState] = useState(0)

  const updateTable = () => setTableState(prev => prev + 1)
  const updateDiagram = () => setDiagramState(prev => prev + 1)
  const updateModification = () => setModificationState(prev => prev + 1)
  const updateAll = () => {
    updateTable()
    updateDiagram()
    updateModification()
  }

  return (
    <StatesContext.Provider
      value={{
        tableState, updateTable,
        diagramState, updateDiagram,
        modificationState, updateModification,
        updateAll
      }}
    >
      {children}
    </StatesContext.Provider>
  )
}

export function useStatesContext() {
  const statesContext = useContext(StatesContext);
  if (!statesContext) {
    throw new Error("StatesContext must be used within a ContextProvider")
  }
  return statesContext
}