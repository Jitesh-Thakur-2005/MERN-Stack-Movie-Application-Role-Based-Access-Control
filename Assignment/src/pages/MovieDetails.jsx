import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../api/movie.api";
import { Container, Typography } from "@mui/material";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography>⭐ {movie.rating}</Typography>
      <Typography sx={{ mt: 2 }}>{movie.description}</Typography>
    </Container>
  );
}
