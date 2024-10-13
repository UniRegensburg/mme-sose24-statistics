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
  { field: 'userID', headerName: 'userID', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'gender', headerName: 'Gender', width: 180, editable: true },
  { field: 'Q1', headerName: 'Q1', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q2', headerName: 'Q2', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q3', headerName: 'Q3', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q4', headerName: 'Q4', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q5', headerName: 'Q5', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q6', headerName: 'Q6', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q7', headerName: 'Q7', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q8', headerName: 'Q8', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q9', headerName: 'Q9', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q10', headerName: 'Q10', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q11', headerName: 'Q11', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q12', headerName: 'Q12', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q13', headerName: 'Q13', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q14', headerName: 'Q14', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q15', headerName: 'Q15', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q16', headerName: 'Q16', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q17', headerName: 'Q17', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q18', headerName: 'Q18', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q19', headerName: 'Q19', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q20', headerName: 'Q20', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q21', headerName: 'Q21', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q22', headerName: 'Q22', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q23', headerName: 'Q23', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q24', headerName: 'Q24', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q25', headerName: 'Q25', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
  { field: 'Q26', headerName: 'Q26', type: 'number', editable: true, align: 'left', headerAlign: 'left' },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId(); 
    setRows((oldRows) => [
      ...oldRows,
      { id, userID:'', age: '', gender: '', Q1: '', Q2: '', Q3: '', Q4: '', Q5: '', Q6: '', Q7: '', Q8: '', Q9: '', Q10: '', Q11: '', Q12: '', Q13: '', Q14: '', Q15: '', Q16: '', Q17: '', Q18: '', Q19: '', Q20: '', Q21: '', Q22: '', Q23: '', Q24: '', Q25: '', Q26: ''},
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
function CsvUploader({ rows, selectedQuestionnaireType  }) {
  const { workspace } = useWorkspaceContext();
  const clickToExport = () => {
    DataService.loadDataFromArray(workspace, rows, selectedQuestionnaireType );
    console.log('Upload to workspace worked.');
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 1,
    }}
  >
    <Button onClick={clickToExport} variant="contained" sx={{
        backgroundColor: '#007bff', color: '#fff', fontSize: '16px', borderRadius: '8px', '&:hover': { backgroundColor: '#0056b3',},}}
    >TABELLE SICHERN</Button>
    </Box>
  );
}

export default function NewRowMaker({ selectedQuestionnaireType }) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow};
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
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
        <CsvUploader rows={rows} selectedQuestionnaireType={selectedQuestionnaireType} />
      </Box>
    </div>
  );
}
