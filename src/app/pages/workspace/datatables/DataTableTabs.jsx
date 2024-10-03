import { TrendingUp } from "@mui/icons-material";
import { useStatesContext } from "../../../../providers/StatesProvider";
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import {
  TableContainer,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import TableToolbar from "./TableToolbar";
import { useState } from "react";



function _prepareColumns(dataEntity) {
  const prepareCol = (col) => {
    return {
      field: col,
      headerName: col,
      editable: col !== "id",
    }
  };
  const userInfo = dataEntity.userInfoColumns.map(prepareCol);
  const questions = dataEntity.questionColumns.map(prepareCol);
  const transform = dataEntity.transformColumns.map(prepareCol);
  return userInfo.concat(questions, transform);
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
      <TableContainer component={Paper} elevation={3}>
        <DataGrid 
          rows={dataEntity.data}
          columns={columns}
          slots={{toolbar: TableToolbar}}
          disableRowSelectionOnClick={true}
          onCellEditStart={(param) => setCurrentCol(param.field)}
          processRowUpdate={(newRow, oldRow) => {
            let value = newRow[currentCol].trim()
            if (/^\d+$/.test(value)) { value = parseFloat(value) } // Check if input is a number
            
            const rowNr = dataEntity.data.findIndex((row) => row.id === oldRow.id)
            dataEntity.setValue(rowNr, currentCol, value)
            console.log(dataEntity)
            return newRow
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error)
          }}
        />

        {/* <Table>
          <TableHead>
            <TableRow>
              {dataEntity.allColumns.map((column) => (
                <TableCell key={column} style={{ backgroundColor: '#00897B', color: '#fff' }}>
                  <Typography variant="subtitle1">{column}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEntity.data && dataEntity.data.length > 0 ? (
              dataEntity.data.map((row) => (
                <TableRow key={row.id}>
                  {dataEntity.allColumns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={dataEntity.allColumns.length}>
                  <Typography variant="body2" color="textSecondary" align="center">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}
      </TableContainer>
    </div>
  );
}