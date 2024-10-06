import { useState } from 'react'
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



// Function to capitalize the categories inside the Report
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to make the Report more human readable
function formatReport(report) {
  if (typeof report === 'object' && report !== null) {
    return (
      <List>
        {Object.entries(report).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={capitalizeFirstLetter(key.replace(/_/g, ' '))} // Capitalize and replace underscores with spaces
              secondary={typeof value === 'object' ? JSON.stringify(value, null, 2).replace(/[{}[\]]/g, '') : value}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  // Return a string without brackets if it's not an Object
  return <DialogContentText>{JSON.stringify(report).replace(/[{}[\]]/g, '')}</DialogContentText>;
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
        my report
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Report Details
          </Typography>
          {formatReport(report)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}