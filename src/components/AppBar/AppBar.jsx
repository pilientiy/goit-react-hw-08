import { AppBar, Box, Toolbar } from "@mui/material";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selector";
import UserMenu from "../UserMenu/UserMenu";


export default function Appbar() {
    const isLoginIn = useSelector(selectIsLoggedIn);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{justifyContent:'space-between'}}>
                    <Navigation />
                    {isLoginIn?<UserMenu/>:<AuthNav/>}                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}