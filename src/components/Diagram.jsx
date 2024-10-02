import * as Plot from "@observablehq/plot";
import Document from "../utils/Document"
import { useWorkspaceContext } from "../providers/WorkspaceProvider";
import { useStatesContext } from "../providers/StatesProvider";


/**
 * React component of a d3.js diagram
 */
export default function Diagram() {
  const { diagramState } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const diagramEntity = workspace.diagramEntity

  if (!diagramEntity) { return <></> }

  // diagramEntity.setOption("x", "age")
  try {
    const plotOptions = diagramEntity.generatePlotOptions()
    return Plot.plot({ ...plotOptions, document: new Document() }).toHyperScript();
  } catch (error) {
    return <p>{error.message}</p>
  }
}