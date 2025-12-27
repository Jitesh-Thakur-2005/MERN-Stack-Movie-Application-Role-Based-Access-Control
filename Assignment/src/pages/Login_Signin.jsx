import { useState } from "react";

import { registerUser,loginUser } from "../api/admin.api";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await registerUser(form);
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ p: 4, width: { xs: "90%", sm: 400 } }}>
        <Typography variant="h5" mb={2} align="center">
          Sign Up
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" name="name" onChange={handleChange} />
          <TextField label="Email" name="email" onChange={handleChange} />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
          <Button sx={{
            backgroundColor:'transparent',color:'black',"&:hover":{
                backgroundColor:'transparent'
            }
          }} variant="contained" onClick={()=>{
            navigate('/login');
            }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// export default Register;



 export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);

    localStorage.setItem("token", res.data.token);
    console.log(res.data.user)
    localStorage.setItem("user", form);

    navigate("/admin/add-movie");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper sx={{ p: 4, width: { xs: "90%", sm: 400 } }}>
        <Typography variant="h5" mb={2} align="center">
          Login
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          
          <Button sx={{
            backgroundColor:'transparent',color:'black',"&:hover":{
                backgroundColor:'transparent'
            }
          }} variant="contained" onClick={()=>{
            navigate('/sign_in');
            }}>
            Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};


