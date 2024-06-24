import { Box, Button, Paper, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import toast,{ Toaster } from 'react-hot-toast';

export default function LoginForm() {
        const dispatch = useDispatch();

    const ContactSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required!'),
        password: Yup.string().required('Required!').min(8, 'Password must be at least 8 characters!')
    });
    const initialValues = {
        email: "",
        password: "",
    }
     const handleSubmid = (values, actions) => {
        dispatch(login(values)).unwrap().then().catch(() => toast.error('Something went wrong, try again...'));
        actions.resetForm();
    }

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={handleSubmid}>
                <Paper elevation={3} sx={{marginTop:2}}>
                    <Box component={Form} sx={{ display: 'flex', gap: 2, padding: '32px 16px', flexDirection: 'column', width: '356px' }}>
                        <ErrorMessage name="email"/>
                        <Field as={TextField} name='email' lable='Email' type='email' helperText='Email' />
                        <ErrorMessage name="password"/>
                        <Field as={TextField} name='password' lable='Password' type='password' helperText='Password' />
                        <Button type='submit' variant="contained" sx={{width:'142px', margin:'0 auto'}}>Log in</Button>
                    </Box>
                </Paper>
            </Formik>
            <Toaster/>
        </>
    )
}