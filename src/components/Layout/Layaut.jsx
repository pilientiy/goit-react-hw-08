import { Box } from "@mui/material";
import AppBar from "../AppBar/AppBar";

export default function Layout({children}) {
    return (
        <Box>
            <AppBar/>
            {children}        
        </Box>
    )
}