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
      <Panel minSize={8}>
        <PanelGroup direction="vertical">
          <Panel minSize={8} className="panel" collapsible={true}>
            {/* data table component */}
            <div className="inner-panel">
              <DataTable />
            </div>
          </Panel>
          <PanelResizeHandle/>
          <Panel minSize={8} className="panel" collapsible={true}>
            {/* visualization component */}
            <div className="inner-panel">
              <Visualization />
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle/>
      <Panel defaultSize={20} minSize={8} maxSize={30} className="panel" collapsible={true}>
        {/* modification component */}
        <div className="inner-panel">
          <Modification />
        </div>
      </Panel>
    </PanelGroup>
  )
}
