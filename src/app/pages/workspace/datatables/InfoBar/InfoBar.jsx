import { Box, IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useErrorContext } from "../../../../../providers/ErrorProvider";
import { useWorkspaceContext } from "../../../../../providers/WorkspaceProvider";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function InfoBar() {
  const { workspace } = useWorkspaceContext()
  const dataEntity = workspace.dataEntity
  const { errorMsg, displayError } = useErrorContext()

  useEffect(() => {
    setTimeout(() => displayError(""), 7000)
  }, [errorMsg])


  return (
    <Box height={30} style={{ display: "flex", alignItems: "center" }}>
      <Link to={"/"}>
        <IconButton style={{borderRadius: 0}}>
          <HomeIcon sx={{ fontSize: 20 }}/>
        </IconButton>
      </Link>
      <Typography fontSize={15}>
        ({dataEntity.type.name}) {workspace.dataName}
      </Typography>
      
      <Box sx={{ flexGrow: 1 }} />
      <Typography fontSize={15} color="error">
        {errorMsg}
      </Typography>
    </Box>
  )
}