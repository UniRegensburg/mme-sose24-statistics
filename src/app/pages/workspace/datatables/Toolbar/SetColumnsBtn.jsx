import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";
import { useStatesContext } from '../../../../../providers/StatesProvider';
import TableChartIcon from '@mui/icons-material/TableChart';
import { parseColumnInput, parseList } from '../../../../../utils/DataUtils';
import QUESTIONNAIRE_TYPE from '../../../../../constants/QuestionnaireType';
import HelpIcon from '@mui/icons-material/Help';
import FUNCTIONS from '../../../../../constants/SupportedFunctions';
import { useErrorContext } from '../../../../../providers/ErrorProvider';



export default function SetColumnsBtn() {
  const { workspace } = useWorkspaceContext();
  const dataEntity = workspace.dataEntity;
  const { updateTable } = useStatesContext();
  const { displayError } = useErrorContext()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'set-columns-popover' : undefined;

  const [questionNr, setQuestionNr] = useState("");
  const [newUserInfo, setNewUserInfo] = useState("");
  const [newTransform, setNewTransform] = useState("");
  const [deleteColumn, setDeleteColumn] = useState("");
  const [qtnType, setQtnType] = useState(dataEntity.type);


  const clearStates = () => {
    setQuestionNr("");
    setNewUserInfo("");
    setNewTransform("");
    setDeleteColumn("");
  };

  const handleClick = (event) => {
    setQtnType(dataEntity.type)
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => setAnchorEl(null);

  const applyChanges = () => {
    handleClose();
    try {
      if (/^\d+$/.test(questionNr)) {
        dataEntity.setNumOfQuestions(parseInt(questionNr));
      }
      dataEntity.addUserInfoColumns(parseList(newUserInfo));
      dataEntity.addTransformColumns(parseList(newTransform))
      dataEntity.deleteColumns(
        parseList(deleteColumn)
          .map(col => parseColumnInput(col, dataEntity))
      );
      dataEntity.setType(qtnType);
    } catch (error) {
      displayError(error.message)
    }

    updateTable();
    clearStates();
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
            <HelpButton />
            <Stack direction="row" spacing={2}>
              <QtnTypeSelect
                currentType={qtnType}
                onChange={(event) => setQtnType(event.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Set question number"
                onChange={(event) => setQuestionNr(event.target.value.trim())}
              />
            </Stack>
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
              onChange={(event) => setDeleteColumn(parseColumnInput(event.target.value, dataEntity))}
            />
            <Button onClick={applyChanges}>Confirm</Button>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}


function HelpButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'help-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HelpText = () => (
    <Box sx={{ width: '100%' }} style={{margin: 20}}>
      {Object.values(FUNCTIONS).map(func => (
        <Typography id={func.name}>
          {func.name}: {func.desc}
        </Typography>
      ))}
    </Box>

  )


  return (
    <div style={{ justifyContent: "flex-end", display: "flex" }}>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <HelpIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <HelpText />
      </Popover>
    </div>
  )
}


const availableQtnTypes = Object.values(QUESTIONNAIRE_TYPE);
availableQtnTypes.shift();

function QtnTypeSelect({ currentType, onChange }) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="qtn-select">Set questionnaire type</InputLabel>
        <Select
          labelId="qtn-select"
          label="Set questionnaire type"
          size='small'
          value={currentType}
          onChange={onChange}
        >
          <MenuItem
            value={QUESTIONNAIRE_TYPE.NONE}
          >
            -
          </MenuItem>
          {availableQtnTypes.map(type => (
            <MenuItem
              key={type.name}
              value={type}
            >
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}