import * as Plot from "@observablehq/plot";
import Document from "../../../../utils/Document"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import { useStatesContext } from "../../../../providers/StatesProvider";
import DIAGRAM_TYPE from "../../../../constants/DiagramType";


/**
 * React component of a d3.js diagram
 */
export default function Diagram() {
  const { diagramState } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const diagramEntity = workspace.diagramEntity

  if (!diagramEntity) { return <></> }

  // diagramEntity.setType(DIAGRAM_TYPE.HIST)
  // diagramEntity.setOption("x", "age")
  try {
    const plotOptions = diagramEntity.generatePlotOptions()
    return Plot.plot({ ...plotOptions, document: new Document() }).toHyperScript();
  } catch (error) {
    return <p>{error.message}</p>
  }
}