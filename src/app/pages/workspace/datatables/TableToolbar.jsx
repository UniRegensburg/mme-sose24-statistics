import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import { useStatesContext } from '../../../../providers/StatesProvider';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TableChartIcon from '@mui/icons-material/TableChart';
import dataAnalysisService from '../../../../services/DataAnalysisService';

export default function TableToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <SetColumnsBtn />
      <MyReportBtn />
    </GridToolbarContainer>
  );
}

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

function MyReportBtn() {
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

// ---------- Danger zone starts here ----------
function SetColumnsBtn() {
  const { workspace } = useWorkspaceContext();
  const dataEntity = workspace.dataEntity;
  const { updateTable } = useStatesContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [questionNr, setQuestionNr] = useState("");
  const [newUserInfo, setNewUserInfo] = useState("");
  const [newTransform, setNewTransform] = useState("");
  const [deleteColumn, setDeleteColumn] = useState("");

  const applyChanges = () => {
    if (/^\d+$/.test(questionNr)) {
      dataEntity.setNumOfQuestions(parseInt(questionNr));
    }
    if (newUserInfo) {
      dataEntity.addUserInfoColumns(newUserInfo);
    }
    if (newTransform) {
      dataEntity.addTransformColumns(newTransform);
    }
    if (deleteColumn) {
      dataEntity.deleteColumns(deleteColumn);
    }
    updateTable();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<TableChartIcon />}
        onClick={handleClick}
      >
        Data settings
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ margin: 3 }}>
          <Stack direction="column" spacing={2}>
            <TextField
              size="small"
              label="Set question number"
              onChange={(event) => setQuestionNr(event.target.value.trim())}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                label="Add user info"
                onChange={(event) => setNewUserInfo(event.target.value.trim())}
              />
              <TextField
                size="small"
                label="Add transform"
                onChange={(event) => setNewTransform(event.target.value.trim())}
              />
            </Stack>
            <TextField
              size="small"
              label="Delete user info/transform column"
              onChange={(event) => setDeleteColumn(event.target.value.trim())}
            />
            <Button onClick={applyChanges}>Confirm</Button>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
// ---------- Danger zone ends here ----------