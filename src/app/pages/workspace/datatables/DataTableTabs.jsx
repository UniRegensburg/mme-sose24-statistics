
/**
 * A tabs component containing data tables from a workspace.
 * 
 * @returns {ReactNode} Rendered tabs component.
 */
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

export default function DataTableTabs() {
  const { workspace } = useWorkspaceContext();
  const dataEntity = workspace.dataEntity;

  console.log("Data Entity:", dataEntity);

  if (!dataEntity || !dataEntity.allColumns) {
    return (
      <Typography variant="h6" color="error">
        No data available
      </Typography>
    );
  }

  return (
    <div className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        😊 Deine Daten: 
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
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
        </Table>
      </TableContainer>
    </div>
  );
}