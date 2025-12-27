import api from "./axios";
import axios from "axios";
export const getMovies = (params) => api.get("/movies", { params });
export const getMovie = (id) => api.get(`/movies/${id}`);
export const addMovie = (data) => api.post("/admin/movies", data);
export const updateMovie = (id, data) =>
  api.put(`/admin/movies/${id}`, data);
export const getadminMovie = (id,data) =>{
  console.log('ji')
 return api.get(`/movies/list`,data);}

export const deleteMovie = (id) =>
  api.delete(`/admin/movies/${id}`);
