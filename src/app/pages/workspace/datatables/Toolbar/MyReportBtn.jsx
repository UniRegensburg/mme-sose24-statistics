import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";
import SummarizeIcon from '@mui/icons-material/Summarize';
import dataAnalysisService from '../../../../../services/DataAnalysisService';

// Function to capitalize the categories inside the report
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to format  objects/arrays to a more readable format
function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map(item => (
      <ListItemText
        key={item}
        primary={typeof item === 'object' ? formatValue(item) : item}
        sx={{ paddingLeft: 2 }} // Indent array items
      />
    ));
  } else if (typeof value === 'object' && value !== null) {
    return (
      <List>
        {Object.entries(value).map(([key, val]) => (
          <ListItem key={key}>
            <ListItemText
              primary={capitalizeFirstLetter(key.replace(/_/g, ' '))}
              secondary={typeof val === 'object' ? formatValue(val) : val}
              sx={{ paddingLeft: 2 }} // Indent nested object values
            />
          </ListItem>
        ))}
      </List>
    );
  }
  return value; // If it's not an array or object, return the value directly
}

// Function to make the report more human-readable
function formatReport(report) {
  if (typeof report === 'object' && report !== null) {
    return (
      <List>
        {Object.entries(report).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={capitalizeFirstLetter(key.replace(/_/g, ' '))}
              secondary={formatValue(value)}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  // Return a string if the report is not an object
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