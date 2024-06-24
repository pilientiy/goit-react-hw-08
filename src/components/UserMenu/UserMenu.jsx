import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selector";
import { logout } from "../../redux/auth/operations";

export default function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <Box sx={{ display: 'flex', gap:2}}>
            <Typography variant="h6" sx={{color:'yellow'}}>Welcome, {user.name}!</Typography>
            <Button variant="text" sx={{color:'#fff'}} onClick={()=>{dispatch(logout())}}>Logout</Button>
        </Box>
    )
}