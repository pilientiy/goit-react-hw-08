import { Box, Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center',padding:'32px'}}>
            <Typography variant="h3">Please log in</Typography>
            <LoginForm/>
        </Box>
    )
}