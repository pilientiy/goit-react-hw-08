import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  changeContact,
  deleteContact,
  fetchContacts,
} from "./operations";
import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./selectors";
import { selectNameFilter } from "../filters/selectors";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleError)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleError)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleError)
      .addCase(changeContact.pending, handlePending)
      .addCase(changeContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(changeContact.rejected, handleError)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.loading = false;
      });
  },
});



export const contactReducer = contactsSlice.reducer;