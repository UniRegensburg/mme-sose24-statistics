import { useState } from 'react'
import { Box, Button, Popover, Typography } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import { useStatesContext } from '../../../../providers/StatesProvider';



export default function TableToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <SetColumnsBtn />
    </GridToolbarContainer>
  );
}


function SetColumnsBtn() {
  // ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext()
  const { updateTable } = useStatesContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // ---------- Danger zone ends here ----------



  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
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