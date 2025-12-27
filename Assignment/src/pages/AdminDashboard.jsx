import { Button, Container, Stack ,Grid} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getadminMovie } from "../api/movie.api";
import MovieCard from "../components/MovieCard";

export default function AdminDashboard() {
  const [movies,setmovies]=useState([]);
  const neavigate= new useNavigate()
  useEffect(()=>{
 async function fetch(){
 const m=await getadminMovie()
  // console.log(m.data)
  setmovies(m.data)
 }
 fetch();
  },[])
  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <Grid container spacing={3} sx={{ mt: 2 }}>
  
      {movies.map((movie, id) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id} onClick={()=>{
              neavigate(`/admin/edit-movie?m_id=${movie._id}`)
        }}>
          <MovieCard movie={movie}  />
        </Grid>
      ))}
    </Grid>
        <Button component={Link} to="/admin/add-movie" variant="contained">
          Add Movie
        </Button>
      </Stack>
    </Container>
  );
}
