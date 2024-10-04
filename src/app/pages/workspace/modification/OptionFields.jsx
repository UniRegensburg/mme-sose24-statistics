import { TextField } from "@mui/material";
import { useEffect } from "react";


export default function OptionFields({ 
  options,
  allOptions,
  requiredOptions,
  onChange
}) {

  return (
    <>
    {allOptions.map((opt, index) => (
          <TextField
            size="small"
            key={index}
            name={opt}
            label={opt}
            value={options[opt]}
            onChange={onChange}
          />
    ))}
    </>
  )
}