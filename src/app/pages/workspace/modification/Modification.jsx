import { useStatesContext } from "../../../../providers/StatesProvider"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider"

/**
 * The user interface for modifying diagram options.
 */
function Modification() {
  const { modificationState, updateDiagram } = useStatesContext()
  const { workspace } = useWorkspaceContext()

  // The diagram entity to be worked on
  const diagramEntity = workspace.diagramEntity
  if (!diagramEntity) { return <></> }

  const allOptions = diagramEntity.allOptions
  const requiredOptions = diagramEntity.requiredOptions

  return (
    <p>Modification</p>
  )
}

export default Modification