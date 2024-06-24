import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { selectContacts } from "../../redux/contacts/selector";
import { useId } from "react";



export default function ModalEdit({ open, close, id }) {
    const dispatch = useDispatch();
    const users = useSelector(selectContacts);
    const idForm = useId();

    
    const user = users.find((user) => user.id === id);

    const handleSubmit= (values) => {
        close();
        dispatch(editContact(values)).unwrap().then(()=>toast('The contact has been edited')).catch(()=>toast('The contact has not been edited'))
    }

     const ContactSchema = Yup.object().shape({
        name: Yup.string().min(3, 'To Short!').max(50, 'To Long!').required('Required!'),
        number: Yup.string().min(3, 'To Short!').max(50, 'To Long!').required('Required!')
    });

  
    const initialValues = {
        id: user.id,
        name: user.name,
        number: user.number,
    }


    return (
        <Dialog open={open} onClose={close}>
            <DialogContent><DialogContentText>Edit contact!</DialogContentText></DialogContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactSchema}>
                <Box component={Form} sx={{ display: 'flex', gap: 2, padding: '32px 16px', flexDirection: 'column', width: '320px' }}>
                    <ErrorMessage name="name" />
                    <Field as={TextField} name='name' lable='name' type='name' helperText='Name' id={`${idForm}+name`}/>
                    <ErrorMessage name="number" />
                    <Field as={TextField} name='number' lable='number' type='text' helperText='Number' id={`${idForm}+number`}/>
                    <DialogActions>
                        <Button onClick={close} color="primary">Cancel</Button>
                        <Button type='submit' color="primary"  autoFocus>Save</Button>
                    </DialogActions>
                </Box>                
            </Formik>
           
       </Dialog>
    )
}