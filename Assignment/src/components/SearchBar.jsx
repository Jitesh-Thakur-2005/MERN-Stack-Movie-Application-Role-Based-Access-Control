import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Search movies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
