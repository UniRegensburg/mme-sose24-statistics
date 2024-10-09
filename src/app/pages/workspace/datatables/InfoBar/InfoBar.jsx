import { Box, IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useErrorContext } from "../../../../../providers/ErrorProvider";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";

export default function InfoBar() {
  const { workspace } = useWorkspaceContext()
  const dataEntity = workspace.dataEntity
  const { errorMsg } = useErrorContext()


  return (
    <Box height={30} style={{ display: "flex", alignItems: "center" }}>
      <IconButton style={{borderRadius: 0}}>
        <HomeIcon sx={{ fontSize: 20 }}/>
      </IconButton>
      <Typography fontSize={15}>
        {dataEntity.type.name}: {workspace.dataPath}
      </Typography>
      
      <Box sx={{ flexGrow: 1 }} />
      <Typography fontSize={15}>
        {errorMsg}
      </Typography>
    </Box>
  )
}