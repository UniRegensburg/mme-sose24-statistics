import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { DIAGRAM_SETTING } from "../../../../constants/DiagramSetting";
import { useWorkspaceContext } from "../../../../providers/WorkspaceProvider";
import { useStatesContext } from "../../../../providers/StatesProvider";
import { useEffect } from "react";



const boolSettingList = Object.values(DIAGRAM_SETTING.BOOL)


export default function DiagramSettings() {
  const { updateDiagram, updateModification } = useStatesContext()
  const { workspace } = useWorkspaceContext()
  const diagramEntity = workspace.diagramEntity

  const onCheckboxChange = (event) => {
    const { name, checked } = event.target
    diagramEntity.setSetting(name, checked)
    updateDiagram()
  }

  return (
    <div>
      <FormGroup sx={{alignItems: 'center'}}>
        <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
          {boolSettingList.map(setting => (
            <FormControlLabel
              control={
                <Checkbox 
                  size="small"
                  name={setting.name}
                  checked={diagramEntity.getSetting(setting.name)}
                  onChange={onCheckboxChange}
                />
              }
              label={setting.name}
            />
          ))}
        </FormControl>
      </FormGroup>
    </div>
  )
}