import { createContext, useState } from "react";
import WorkspaceEntity from "../entities/WorkspaceEntity";


export const WorkspaceContext = createContext(null)

export function WorkspaceProvider({ children }) {
  const emptyWorkspace = new WorkspaceEntity()
  const [workspace, setWorkspace] = useState(emptyWorkspace)

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  )

}