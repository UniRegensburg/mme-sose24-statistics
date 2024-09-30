import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import "./Workspace.css"
import DataTable from "./datatables/DataTableTabs"
import Visualization from "./visualization/Visualization"
import Modification from "./modification/Modification"
import WorkspaceEntity from "../../../entities/WorkspaceEntity"
import { StatesProvider } from "../../../providers/StatesProvider"

/**
 * Main user interface for data analysis. Contains `DataTable`,
 * `Visualization` and `Modification` as sub-components.
 * 
 * @param {WorkspaceEntity} workspaceEntity This argument should be a `WorkspaceEntity`.
 * @returns {ReactNode} Rendered React component.
 */
export default function Workspace(workspaceEntity) {
  return (
    <StatesProvider>

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

    </StatesProvider>
  )
}
