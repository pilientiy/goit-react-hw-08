import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthheader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthheader = ()=> {
    axios.defaults.headers.common.Authorization = ``
}


export const register = createAsyncThunk(
    'auth/register',
    async (newUser, thunkAPI) => {
        try {
            const respons = await axios.post('/users/signup', newUser);
            setAuthheader(respons.data.token);
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userInfo, thunkAPI) => {
        try {
            const respons = await axios.post('/users/login', userInfo);
            setAuthheader(respons.data.token);
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const respons = await axios.post('/users/logout');
            clearAuthheader();
            return respons.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const reduxState = thunkAPI.getState();
        setAuthheader(reduxState.auth.token);
        const respons = await axios.get('/users/current'); 
        return respons.data;
    },
    {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
)