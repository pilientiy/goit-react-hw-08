import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filters/selector';
import { changeFilter } from '../../redux/filters/slice';
import { Box, TextField, Typography } from '@mui/material';

export default function SearchBox() {

    const filter = useSelector(selectNameFilter);
    const dispatch = useDispatch();    
    const handleFilter = e => dispatch(changeFilter(e.target.value.trim()))        
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'356px'}}>
            <Typography variant='h6' >Find contact</Typography>
            <TextField variant='standard' type="text" onChange ={handleFilter} value={filter} />
        </Box>
    )
}