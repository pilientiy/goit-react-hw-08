import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";



export default function ModalDelete({ open, close, id }) {
     const dispatch = useDispatch();
    const handleDelete = () => {
        close();        
        dispatch(deleteContact(id)).unwrap().then(()=>toast('The contact has been deleted'))
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{"Confirm Deletion"}</DialogTitle>
            <DialogContent><DialogContentText>Are you sure you want to delete this contact?</DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">Cancel</Button>
                <Button onClick={handleDelete} color="primary" autoFocus>Delete</Button>
            </DialogActions>
       </Dialog>
    )
}