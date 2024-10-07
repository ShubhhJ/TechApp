import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'favorites/fetchProducts',
  async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post(
      'http://3.7.81.243/projects/plie-api/public/api/events-listing', 
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      }
    );

    return response.data.data.events; 
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(product => product.event_id !== action.payload.event_id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
