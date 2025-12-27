import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import AdminDashboard from "../pages/AdminDashboard";
import AddMovie from "../pages/AddMovie";
import { Login, Register } from "../pages/Login_Signin";
import EditMovie from "../pages/EditMovie";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/sign_in" element={<Register/>} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add-movie" element={<AddMovie />} />
      <Route path="/admin/edit-movie" element={<EditMovie />} />
    </Routes>
  );
}
