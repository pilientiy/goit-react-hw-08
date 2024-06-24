import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/selector";
import { List, ListItem } from "@mui/material";

export default function ContactList({modalOpenDelete, modalOpenEdit}) {
    const contacts = useSelector(selectFilteredContacts);
  
    return (
        <List sx={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
            {contacts.map((contactItem) => (
                <ListItem sx={{width:'356px'}} key={contactItem.id}>
                    <Contact contact={contactItem} modalOpenDelete={modalOpenDelete} modalOpenEdit={modalOpenEdit}  />
                </ListItem>
            ))}
        </List>
    )
}