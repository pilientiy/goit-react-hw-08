import { HiPhone } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import { Box, Card, CardContent, IconButton, List, ListItem, Typography } from "@mui/material";
import { DeleteSweepOutlined, EditNoteOutlined } from "@mui/icons-material";


export default function Contact({ contact: {id, name, number }, modalOpenDelete, modalOpenEdit }) { 

    return (
        <>
            <Card sx={{width:'356px', height:'160px'}}>
                <CardContent sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <List>
                        <ListItem sx={{display:'flex', gap:2}}>
                            <IoPerson />
                            <Typography variant="h6">{name}</Typography>  
                        </ListItem>    
                        <ListItem sx={{display:'flex', gap:2}}>
                            <HiPhone/>
                            <Typography variant="p">{number}</Typography>  
                        </ListItem>
                    </List>       
                    <Box sx={{display:'flex', flexDirection:'column', gap:1}}>                        
                        <IconButton variant="outlined" type="button" onClick={()=>{modalOpenEdit(id)}} ><EditNoteOutlined/></IconButton>
                        <IconButton variant="outlined" type="button" onClick={()=>{modalOpenDelete(id)}}><DeleteSweepOutlined/></IconButton>
                    </Box>
                </CardContent>                     
            </Card>
        </>
    )
}