import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import "./Workspace.css"
import DataTable from "./datatables/DataTableTabs"
import Visualization from "./visualization/Visualization"
import Modification from "./modification/Modification"
import { useStatesContext } from "../../../providers/StatesProvider"
import { useEffect } from "react"
import { useWorkspaceContext } from "../../../providers/WorkspaceProvider"
import dataService from "../../../services/DataService"
import DiagramEntity from "../../../entities/DiagramEntity"
import DIAGRAM_TYPE from "../../../constants/DiagramType"

/**
 * Main user interface for data analysis. Contains `DataTable`,
 * `Visualization` and `Modification` as sub-components.
 */
export default function Workspace() {
  const { workspace, setWorkspace } = useWorkspaceContext()
  const { updateAll } = useStatesContext()

  // Import test data. Must be deleted in production
  useEffect(() => {
    dataService.importData("tests/test-data/SUS-example.csv")
          .then(dataEntity => {
            workspace.setDataEntity(dataEntity)
            const diagramEntity = new DiagramEntity(DIAGRAM_TYPE.NONE, dataEntity)
            workspace.setDiagramEntity(diagramEntity)
            updateAll()
          })
  }, [])

  return (
    <PanelGroup direction="horizontal" className="container">
      <Panel minSize={10}>
        <PanelGroup direction="vertical">
          <Panel minSize={10} className="panel">
            {/* data table component */}
            <DataTable />
          </Panel>
          <PanelResizeHandle/>
          <Panel minSize={10} className="panel">
            {/* visualization component */}
            <Visualization />
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle/>
      <Panel defaultSize={30} minSize={10} className="panel">
        {/* modification component */}
        <Modification />
      </Panel>
    </PanelGroup>
  )
}
