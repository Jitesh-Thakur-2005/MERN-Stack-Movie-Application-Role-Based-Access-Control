import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { getMovie, updateMovie } from "../api/movie.api";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";


export default function EditMovie() {

const [searchParams] = useSearchParams();
const id = searchParams.get("m_id"); 
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        poster: "",
        year: "",
        type: "",
        admin_id: '',
    });

    // 🔹 Load movie data
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await getMovie(id);
                setForm({
                    title: data.title || "",
                    poster: data.poster || "",
                    year: data.year || "",
                    type: data.type || "",
                    admin_id: data.admin_id || "",
                });
            } catch (err) {
                console.error(err);
                alert("Failed to load movie");
            }
        };

        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                poster: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const submit = async () => {
        try {
            await updateMovie(id, {
                ...form,
                year: Number(form.year),
            });
            alert("Movie updated successfully");
            navigate("/admin/movies");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" mb={2}>
                Edit Movie
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />


                <Button variant="outlined" component="label">
                    Change Poster
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                    />
                </Button>


                {form.poster && (
                    <img
                        src={form.poster}
                        alt="Poster"
                        style={{ width: 160, borderRadius: 8 }}
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
                    Update Movie
                </Button>
            </Stack>
        </Container>
    );
}
