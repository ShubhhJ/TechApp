import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://3.7.81.243/projects/plie-api/public/api/login', 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );

      if (response.data.success && response.data.data.token) {
        await AsyncStorage.setItem('token', response.data.data.token);
        return { email, token: response.data.data.token };
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true; 
        state.token = action.payload.token;
        state.user = action.payload; 
        state.error = null; 
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false; 
        state.token = null;
        state.user = null; 
        state.error = action.payload; 
      });
  },
});

export default authSlice.reducer;
