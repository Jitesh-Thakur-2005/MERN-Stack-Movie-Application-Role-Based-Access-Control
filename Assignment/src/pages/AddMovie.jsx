import { useState } from "react";
import { addMovie } from "../api/movie.api";
// import { TextField, Button, Container, Stack } from "@mui/material";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";


export default function AddMovie() {
   console.log(localStorage.getItem("user"))
  const [form, setForm] = useState({
    title: "",
    poster: "", // base64 string
    year: "",
    type: "",
    admin_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Convert image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        poster: reader.result, // base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    try {
      await addMovie({
        ...form,
        year: Number(form.year),
      });
      alert("Movie added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add movie");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* Image Input */}
        <Button variant="outlined" component="label">
          Upload Poster
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>

        {/* Preview */}
        {form.poster && (
          <img
            src={form.poster}
            alt="Poster Preview"
            style={{ width: "150px", borderRadius: "8px" }}
          />
        )}

        <TextField
          label="Release Year"
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
        />
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            row
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <FormControlLabel
              value="movie"
              control={<Radio />}
              label="Movie"
            />
            <FormControlLabel
              value="series"
              control={<Radio />}
              label="Series"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </Stack>
    </Container>
  );
}
