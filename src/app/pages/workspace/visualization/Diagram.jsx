import * as Plot from "@observablehq/plot";
import Document from "../../../../utils/Document"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import { useStatesContext } from "../../../../providers/StatesProvider";
import DIAGRAM_TYPE from "../../../../constants/DiagramType";
import { Typography } from "@mui/material";


/**
 * React component of a d3.js diagram
 */
export default function Diagram() {
  const { diagramState } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const diagramEntity = workspace.diagramEntity

  if (!diagramEntity) { return <></> }

  try {
    const plotOptions = diagramEntity.generatePlotOptions()
    return Plot.plot({ ...plotOptions, document: new Document() }).toHyperScript();
  } catch (error) {
    return <Typography style={{margin:40}}>{error.message}</Typography>
  }
}