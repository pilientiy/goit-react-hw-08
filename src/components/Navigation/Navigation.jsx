import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selector";

export default function Navigation() {
    const isLoadingIn = useSelector(selectIsLoggedIn)
    return (
        <nav>
            <NavLink to='/'><Button sx={{color:'#fff'}}>Home</Button></NavLink>
            {isLoadingIn&&<NavLink to='/contacts'><Button sx={{ color:'#fff'}}>Contacts</Button></NavLink>}
        </nav>
    )
}