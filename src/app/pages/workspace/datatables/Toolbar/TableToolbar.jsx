import {
  Box,
} from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
import SetColumnsBtn from './SetColumnsBtn';
import MyReportBtn from './MyReportBtn';

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
