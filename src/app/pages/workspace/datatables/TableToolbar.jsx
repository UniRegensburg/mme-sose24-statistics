import { useState } from 'react'
import { Box, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Popover,
  Typography
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


function MyReportBtn() {
// ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext()
  const dataEntity = workspace.dataEntity
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const report = dataAnalysisService.getReport(dataEntity)
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
          <DialogContentText>
            {JSON.stringify(report)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


// ---------- Danger zone starts here ----------
function SetColumnsBtn() {
  const { workspace } = useWorkspaceContext()
  const { updateTable } = useStatesContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  
  
  
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
        set columns
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
        <Typography sx={{ p: 2 }}>Your code here</Typography>
      </Popover>
    </div>
  )
}
// ---------- Danger zone ends here ----------