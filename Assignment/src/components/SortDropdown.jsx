import { MenuItem, TextField } from "@mui/material";

export default function SortDropdown({ value, onChange }) {
  return (
    <TextField select label="Type" value={value} onChange={onChange}>
      <MenuItem value="Movie">Movie</MenuItem>
      <MenuItem value="series">series</MenuItem>

    </TextField>
  );
}
