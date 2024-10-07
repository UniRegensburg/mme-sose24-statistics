import { useEffect, useState } from "react"
import { useStatesContext } from "../../../../providers/StatesProvider"
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider"
import { Box, Button, DialogActions, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import DIAGRAM_TYPE from "../../../../constants/DiagramType"
import OptionFields from "./OptionFields"
import DiagramSettings from "./DiagramSettings"
import { parseColumnInput } from "../../../../utils/DataUtils"


const availablDiagTypes = Object.values(DIAGRAM_TYPE)
availablDiagTypes.shift()

const emptyOptions = (allOptions) => {
  const options = {}
  allOptions.forEach(opt => options[opt] = "")
  return options
}


/**
 * The user interface for modifying diagram options.
 */
function Modification() {
  const { modificationState, updateDiagram, updateModification } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const diagramEntity = workspace.diagramEntity
  const dataEntity = workspace.dataEntity
  if (!diagramEntity) { return <></> }
  
  const allOptions = diagramEntity.allOptions
  const requiredOptions = diagramEntity.requiredOptions
  const [options, setOptions] = useState(emptyOptions(allOptions))


  const handleInputChange = (event) => {
    const { name, value } = event.target
    setOptions({
      ...options,
      [name]: value
    })
  }

  const handleTypeChange = (event) => {
    diagramEntity.setType(event.target.value)
    setOptions(emptyOptions(diagramEntity.allOptions))
    updateDiagram()
  }

  const confirm = () => {
    Object.keys(options).map(opt => {
      let value = null
      if (opt === "x" || opt === "y") { value = parseColumnInput(options[opt], dataEntity) }
      else { value = options[opt]}
      diagramEntity.setOption(opt, value)
    })
    updateDiagram()
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") { confirm() }
  }


  return (
    <div
    style={{margin: "10px"}}
    tabIndex="0"
    onKeyDown={onKeyDown}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Divider>Diagram Type</Divider>
        <FormControl fullWidth>
          <InputLabel id="diagram-type">Choose type</InputLabel>
        <Select
          labelId="diagram-type"
          label="Choose type"
          size="small"
          value={diagramEntity.type}
          onChange={handleTypeChange}
        >
          <MenuItem value={DIAGRAM_TYPE.NONE}>-</MenuItem>
          {availablDiagTypes.map((type, index) => (
            <MenuItem key={index} value={type}>{type.name}</MenuItem>
          ))}
        </Select>
        </FormControl>

        <Divider>Options</Divider>

        <OptionFields
          options={options}
          allOptions={allOptions}
          requiredOptions={requiredOptions}
          onChange={handleInputChange}
        />

        <Divider>Settings</Divider>

        <DiagramSettings />

        <Divider />
      </Box>
        

      <Button onClick={confirm} style={{margin: '1em'}}>
        Apply changes
      </Button>
    </div>
  )
}

export default Modification