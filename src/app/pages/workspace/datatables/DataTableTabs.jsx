import { useStatesContext } from "../../../../providers/StatesProvider";
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import {
  TableContainer,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import TableToolbar from "./Toolbar/TableToolbar";
import { useState } from "react";



function _prepareColumns(dataEntity) {
  const prepareCol = (type) => (col) => {
    return {
      field: col,
      headerName: col,
      editable: col !== "id",
      headerClassName: `${type}-header`
    }
  };
  const userInfo = [{
    field: "id",
    headerName: "id",
    editable: false
  }];
  for (let userInfoCol of dataEntity.userInfoColumns) {
    if (userInfoCol !== "id") {
      userInfo.push(prepareCol("userInfo")(userInfoCol));
    }
  }
  const questions = dataEntity.questionColumns.map(prepareCol("questions"));
  const transform = dataEntity.transformColumns.map(prepareCol("transform"));
  return userInfo.concat(transform, questions);
}

/**
 * A tabs component containing data tables from a workspace.
 * 
 * @returns {ReactNode} Rendered tabs component.
 */
export default function DataTableTabs() {
  // ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext();
  const dataEntity = workspace.dataEntity;
  const { 
    tableState,
    updateTable,
    updateAll
  } = useStatesContext();
  const [currentCol, setCurrentCol] = useState("")
  
  // ---------- Danger zone ends here ----------
  
  
  if (!dataEntity) {
    return (
      <Typography variant="h6" color="error">
        No data available
      </Typography>
    );
  }
  
  const columns = _prepareColumns(dataEntity);
  
  return (
    <div className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        😊 Deine Daten: 
      </Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          '& .userInfo-header': {
            backgroundColor: 'rgb(255, 240, 240)',
          },
          '& .transform-header': {
            backgroundColor: 'rgb(240, 255, 240)',
          },
          '& .questions-header': {
            backgroundColor: 'rgb(240, 240, 255)',
          },
        }}
      >
        <DataGrid 
          rows={dataEntity.data}
          rowHeight={28}
          columns={columns}
          showCellVerticalBorder
          showColumnVerticalBorder
          slots={{toolbar: TableToolbar}}
          disableRowSelectionOnClick={true}
          onCellEditStart={(param) => setCurrentCol(param.field)}
          processRowUpdate={(newRow, oldRow) => {
            let value = String(newRow[currentCol]).trim()
            if (/^\d+$/.test(value)) { value = parseFloat(value) } // Check if input is a number
            
            const rowNr = dataEntity.data.findIndex((row) => row.id === oldRow.id)
            dataEntity.setValue(rowNr, currentCol, value)
            return newRow
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error)
          }}
        />
      </TableContainer>
    </div>
  );
}