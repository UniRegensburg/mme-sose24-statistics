import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { randomId } from '@mui/x-data-grid-generator';
import { GridToolbarContainer, useGridApiRef, GridRowModes } from '@mui/x-data-grid';
import { useWorkspaceContext } from '../../../providers/WorkspaceProvider';
import DataService from '../../../services/DataService';
import QUESTIONNAIRE_TYPE from "../../../constants/QuestionnaireType";

// Start-Table
const initialRows = [
];

const columns = [
  { field: 'id', headerName: 'ID', width: 180, editable: true },
  { field: 'userID', headerName: 'userID', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'gender', headerName: 'Gender', width: 180, editable: true },
  { field: 'Q1', headerName: 'Q1', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q2', headerName: 'Q2', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q3', headerName: 'Q3', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q4', headerName: 'Q4', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId(); 
    setRows((oldRows) => [
      ...oldRows,
      { id, userID:'', age: '', gender: '', Q1: '', Q2: '', Q3: '', Q4: ''},
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'userID' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Zeile hinzufügen
      </Button>
    </GridToolbarContainer>
  );
}

//Exports to workspace
function CsvUploader({ rows }) {
  const { workspace } = useWorkspaceContext();
  const clickToExport = () => {
    DataService.loadDataFromArray(workspace, rows);
    console.log('Upload to workspace worked.');
  };

  return (
    <Button onClick={clickToExport}>Export as CSV to Workspace</Button>
  );
}

export default function NewRowMaker() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const apiRef = useGridApiRef();

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        apiRef={apiRef}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <Box>
        <CsvUploader rows={rows} />
      </Box>
    </div>
  );
}
