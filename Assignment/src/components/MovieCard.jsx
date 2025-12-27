import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { get_MoviesCrd } from "../api/movie.api";
import axios from "axios";
export default function MovieCard({ movie }) {

  return (
    <Card
      component={Link}
      // to={`/movie/${movie._id}`}
      sx={{ textDecoration: "none", height: "100%" }}
    >
      <CardMedia
        component="img"
        height="250"
        image={movie.poster || "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
}
