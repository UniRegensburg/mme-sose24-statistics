import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";
import SummarizeIcon from '@mui/icons-material/Summarize';
import dataAnalysisService from '../../../../../services/DataAnalysisService';

// Function to capitalize the data categories
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to format data into a table
function renderDataAsTable(data) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Kategorie</strong></TableCell>
            <TableCell><strong>Wert</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell style={{ verticalAlign: 'top' }}>
                {capitalizeFirstLetter(key.replace(/_/g, ' '))}
              </TableCell>
              <TableCell>
                {typeof value === 'object' ? formatValue(value) : value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Function to format objects/arrays into a human-readable format
function formatValue(value) {
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, index) => (
          <li key={index}>{typeof item === 'object' ? formatValue(item) : item}</li>
        ))}
      </ul>
    );
  } else if (typeof value === 'object' && value !== null) {
    return (
      <ul>
        {Object.entries(value).map(([key, val]) => (
          <li key={key}>
            {capitalizeFirstLetter(key.replace(/_/g, ' '))}: {typeof val === 'object' ? formatValue(val) : val}
          </li>
        ))}
      </ul>
    );
  }
  return value;
}

// Function to render the table
function formatReport(report) {
  if (typeof report === 'object' && report !== null) {
    return renderDataAsTable(report);
  }

  // Return string if the data file is not an object
  return <DialogContentText>{report}</DialogContentText>;
}

export default function MyReportBtn() {
  // ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext();
  const dataEntity = workspace.dataEntity;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const report = dataAnalysisService.getReport(dataEntity);
  // ---------- Danger zone ends here ----------

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<SummarizeIcon />}>
        Daten-Report
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Ihre übergebenen Daten:
          </Typography>
          {formatReport(report)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}