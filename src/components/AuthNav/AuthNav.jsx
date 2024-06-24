import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AuthNav() {
    return (
        <div>
            <NavLink to='/register'><Button sx={{color: '#fff'}}>Register</Button></NavLink>
            <NavLink to='/login'><Button sx={{ color: '#fff' }}>Log In</Button></NavLink>
        </div>
    )
}