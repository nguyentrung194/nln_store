import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const BasicSelect = () => {
  const [time, setTime] = React.useState("30");

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event?.target?.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Time"
          onChange={handleChange}
        >
          <MenuItem value={30}>Last 30 Days</MenuItem>
          <MenuItem value={183}>Last 6 Months</MenuItem>
          <MenuItem value={365}>Last 1 Years</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export const SelectFilter = ({
  values,
  name,
  initValue,
}: {
  values: any[];
  name: any;
  initValue?: any;
}) => {
  const [time, setTime] = React.useState(initValue || "");

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event?.target?.value as string);
  };
  console.log(values);

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            fontSize: "13px",
          }}
          id="demo-simple-select-label"
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label={name}
          onChange={handleChange}
        >
          {values.map(({ value, text }: { value: string; text: string }) => {
            return <MenuItem value={value}>{text}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
