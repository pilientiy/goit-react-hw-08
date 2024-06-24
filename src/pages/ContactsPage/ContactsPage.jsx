import { Box, LinearProgress} from "@mui/material";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from '../../components/SearchBox/SearchBox'
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selector";
import { useEffect, useState } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import ModalEdit from "../../components/ModalEdit/ModalEdit";

export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentContactDelete, setCurrentContactDelete] = useState();
    const [currentContactEdit, setCurrentContactEdit] = useState();

    const handleOpenDelete = (contact) => {
        setOpenDelete(true);
        setCurrentContactDelete(contact);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);

    } 
       const handleOpenEdit = (contact) => {
        setOpenEdit(true);
        setCurrentContactEdit(contact);
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);

    } 


    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])
    
    return (
        <Box component='section' >
           <Box sx={{padding:'32px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', alignItems:'center', gap:'20px'}}>
                <ContactForm />
                <SearchBox />
           </Box>
            {isLoading&&<LinearProgress/>}
            <ContactList modalOpenDelete={handleOpenDelete} modalOpenEdit={handleOpenEdit} />
            <ModalDelete open={openDelete} close={handleCloseDelete} id={currentContactDelete} />
            {currentContactEdit&&<ModalEdit open={openEdit} close={handleCloseEdit} id={currentContactEdit}/>}
        </Box>
    )
}