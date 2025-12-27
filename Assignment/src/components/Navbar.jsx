import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/admin.api";

export default function Navbar() {
  console.log(localStorage.getItem('usre'))
  const islogin=localStorage.getItem('user')!=null?true:false;
  useEffect(()=>{
    async function log_in() {
     if(islogin) await loginUser(localStorage.getItem('usre'))
      
    }
  })
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">🎬 Movie App</Typography>
        {islogin?<Button color="inherit" component={Link} to="/admin">
          Dashboard
        </Button>:<Button color="inherit" component={Link} to="/sign_in">
          Sign In
        </Button>}
      </Toolbar>
    </AppBar>
  );
}
