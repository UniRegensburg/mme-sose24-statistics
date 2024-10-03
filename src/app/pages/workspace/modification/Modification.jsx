import { useState } from "react"
import { useStatesContext } from "../../../../providers/StatesProvider"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider"
import { Box, Button, DialogActions, Divider, FormControl, MenuItem, Select, TextField } from "@mui/material"
import DIAGRAM_TYPE from "../../../../constants/DiagramType"


const availablDiagTypes = Object.values(DIAGRAM_TYPE)
availablDiagTypes.shift()


/**
 * The user interface for modifying diagram options.
 */
function Modification() {
  const { modificationState, updateDiagram, updateModification } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const [options, setOptions] = useState({})

  // The diagram entity to be worked on
  const diagramEntity = workspace.diagramEntity
  if (!diagramEntity) { return <></> }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    options[name] = value
  }

  const handleTypeChange = (event) => {
    diagramEntity.setType(event.target.value)
    updateModification()
    updateDiagram()
  }

  const confirm = (event) => {
    Object.keys(options).map(opt => diagramEntity.setOption(opt, options[opt]))
    updateDiagram()
  }

  const allOptions = diagramEntity.allOptions
  const requiredOptions = diagramEntity.requiredOptions

  return (
    <div style={{margin: "10px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Select
          label="Diagram Type"
          size="small"
          value=""
          onChange={handleTypeChange}
        >
          <MenuItem value={DIAGRAM_TYPE.NONE}>-</MenuItem>
          {availablDiagTypes.map((type, index) => (
            <MenuItem key={index} value={type}>{type.name}</MenuItem>
          ))}
        </Select>

        <Divider>Options</Divider>

        {allOptions.map((opt, index) => (
          <TextField
            size="small"
            key={index}
            name={opt}
            label={opt}
            onChange={handleInputChange}
          />
        ))}

        <Divider />
      </Box>
        

      <Button onClick={confirm}>
        Apply changes
      </Button>
    </div>
  )
}

export default Modification