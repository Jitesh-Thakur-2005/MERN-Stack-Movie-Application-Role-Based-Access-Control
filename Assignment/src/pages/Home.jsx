import { useEffect, useState } from "react";
import { Grid, Container, Stack } from "@mui/material";
import { getMovies } from "../api/movie.api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("movie");

  useEffect(() => {
   async function fetch(){try {
      const res = await getMovies({ search:search, sortBy: sort });

      if (res.data) {
        console.log(res.data)
        setMovies(res.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("API error:", error);
      setMovies([]);
    }}
  fetch()
}, [search, sort]);

return (
  <Container sx={{ mt: 4 }}>
    <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
      <SearchBar value={search} onChange={setSearch} />
      <SortDropdown value={sort} onChange={(e) => setSort(e.target.value)} />
    </Stack>

    <Grid container spacing={3} sx={{ mt: 2 }}>
  
      {movies.map((movie, id) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  </Container>
);
}
