import { Box, Typography } from "@mui/material";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center',padding:'32px'}}>
            <Typography variant="h3">Register your account</Typography>
            <RegistrationForm/>
        </Box>
    )
}