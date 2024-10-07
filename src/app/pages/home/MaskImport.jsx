import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { randomId } from '@mui/x-data-grid-generator';
import { GridToolbarContainer } from '@mui/x-data-grid';
// Table from MUI (https://mui.com/x/react-data-grid/editing/#full-featured-crud-component)
// Start-Table
const initialRows = [
    {
      id: "1",
      userID: "2",
      gender: "W",
      age: 12,
      Q1: 1,
      Q2: 1,
      Q3: 2,
      Q4: 4,
    },
  ];
  
  const columns = [
    { field: 'userID', headerName: 'User-ID', width: 180, editable: true },
    { field: 'gender', headerName: 'Geschlecht', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Alter',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'Q1',
      headerName: 'Q1',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'Q2',
      headerName: 'Q2',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'Q3',
      headerName: 'Q3',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'Q4',
      headerName: 'Q4',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
  ];
  
  function EditToolbar(props) {
    const { setRows } = props;
    //New row
    const handleClick = () => {
      const id = randomId(); // Random ID
      setRows((oldRows) => [
        ...oldRows,
        { id, userID: '', gender: '', age: '', Q1: '', Q2: '', Q3: '', Q4: '' },
      ]);
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Zeile hinzufügen
        </Button>
      </GridToolbarContainer>
    );
  }
  
  export default function NewRowMaker() {
    const [rows, setRows] = React.useState(initialRows);
  
    return (
        <div style={{ height: 400, width: '100%' }}> 
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows },
          }}
        />
      </div>
    );
  }