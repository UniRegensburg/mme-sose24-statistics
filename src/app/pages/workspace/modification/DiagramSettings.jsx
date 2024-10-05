import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { DIAGRAM_SETTING } from "../../../../constants/DiagramSetting";



const boolSettingList = Object.values(DIAGRAM_SETTING.BOOL)


export default function DiagramSettings(
  
) {
  return (
    <div>
      <FormGroup sx={{alignItems: 'center'}}>
        <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
          {boolSettingList.map(setting => (
            <FormControlLabel
              control={
                <Checkbox size="small" />
              }
              label={setting.name}
            />
          ))}
        </FormControl>
      </FormGroup>
    </div>
  )
}