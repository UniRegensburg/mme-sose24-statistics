import * as Plot from "@observablehq/plot";
import Document from "../utils/Document"


/**
 * 
 * @param {DiagramEntity} diagramEntity 
 * @returns 
 */
export default function Diagram({ diagramEntity }) {
  if (!diagramEntity) { return <></> }
  const plotOptions = diagramEntity.generatePlotOptions()
  return Plot.plot({ ...plotOptions, document: new Document() }).toHyperScript();
}