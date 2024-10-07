import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";
import { useStatesContext } from '../../../../../providers/StatesProvider';
import TableChartIcon from '@mui/icons-material/TableChart';




export default function SetColumnsBtn() {
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
            <Divider />
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