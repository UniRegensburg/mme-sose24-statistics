import { createContext, useContext, useState } from "react";
import WorkspaceEntity from "../entities/WorkspaceEntity";
import DataEntity from "../entities/DataEntity";
import DiagramEntity from "../entities/DiagramEntity";
import DIAGRAM_TYPE from "../constants/DiagramType";


const WorkspaceContext = createContext(null)


/**
 * Provide globally accessible workspace entity. Also work as a factory that generates an
 * empty workspace entity.
 */
export function WorkspaceProvider({ children }) {
  const emptyWorkspace = new WorkspaceEntity()
  const dataEntity = new DataEntity()
  const diagramEntity = new DiagramEntity(DIAGRAM_TYPE.NONE, dataEntity)

  emptyWorkspace.setDataEntity(dataEntity)
  emptyWorkspace.setDiagramEntity(diagramEntity)

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