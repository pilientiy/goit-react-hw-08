import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
    'contscts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const respons = await axios.get('/contacts');
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (newContacts, thunkAPI) => {
        try {
            
            const respons = await axios.post('/contacts', newContacts);
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);


export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactsId, thunkAPI) => {
        try {
            const respons = await axios.delete(`/contacts/${contactsId}`);
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const editContact = createAsyncThunk(
    'contacts/editContact',
    async (editContact, thunkAPI) => {
        try {
            const { id, ...updateData } = editContact;
            const respons = await axios.patch(`/contacts/${id}`, updateData);
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);