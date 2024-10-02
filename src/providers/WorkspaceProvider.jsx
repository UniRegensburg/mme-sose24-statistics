import { createContext, useContext, useState } from "react";
import WorkspaceEntity from "../entities/WorkspaceEntity";


const WorkspaceContext = createContext(null)

export function WorkspaceProvider({ children }) {
  const emptyWorkspace = new WorkspaceEntity()
  const [workspace, setWorkspace] = useState(emptyWorkspace)
  
  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspaceContext() {
  const workspaceContext = useContext(WorkspaceContext);
  if (!workspaceContext) {
    throw new Error("WorkspaceContext must be used within a ContextProvider")
  }
  return workspaceContext
}