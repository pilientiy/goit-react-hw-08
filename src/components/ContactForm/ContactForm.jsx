import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import css from './ContactForm.module.css';
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Box, Button, Input, InputLabel, Paper } from "@mui/material";
import toast,{ Toaster } from 'react-hot-toast';


export default function ContactForm() {
    const dispatch = useDispatch();
    
    const ContactSchema = Yup.object().shape({
        name: Yup.string().min(3, 'To Short!').max(50, 'To Long!').required('Required!'),
        number: Yup.string().min(3, 'To Short!').max(50, 'To Long!').required('Required!')
    });

    const id = useId();
  
    const initialValues = {
            name: "",
            number: ""
    }
    function handleSubmit(values, actions) {
        dispatch(addContact(values)).unwrap().then(()=>toast('The contact has been added successefully'));
        actions.resetForm();
    }
  
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactSchema}>
                <Paper elevation={3} sx={{width:'700px'}}>
                    <Box component={Form} sx={{display: 'flex', justifyContent:'space-between', gap:1,alignItems:'center', padding:'16px',flexWrap:'wrap'}}>
                        <InputLabel htmlFor={`${id}+name`}>Name</InputLabel>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ErrorMessage name="name" component="span" className={css.message}/>
                            <Field as={Input} type="text" name="name" id={`${id}+name`}/>                        
                       </Box>
        
                        <InputLabel htmlFor={`${id}+number`}>Number</InputLabel>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ErrorMessage name="number" component="span" className={css.message} />
                            <Field as={Input} type="text" name="number" id={`${id}+number`} />                    
                        </Box>
                        
                        <Button variant="text" className={css.button} type="submit">Add contact</Button>
                    </Box>
                </Paper>
            </Formik>
            <Toaster/>
        </>
    )
}