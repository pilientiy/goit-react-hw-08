import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, editContact} from "./operations";

const handlePending = state => {
    state.error = false;
    state.loading = true;
}
        
const handleRejected = state => {
    state.loading = false;
    state.error = true;
}
        
const slice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder.addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(editContact.pending, handlePending)
            .addCase(editContact.fulfilled, (state, action) => {
                const updateUser = action.payload;
                const index = state.items.findIndex(user => user.id === updateUser.id);
                if (index !== -1) {
                    state.items[index] = updateUser;
                }
                state.loading = false;
            })
            .addCase(editContact.rejected, handleRejected)
         
    }    
})

export default slice.reducer;
