import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchAttractions = createAsyncThunk(
  'attractions/fetchAttractions',
  async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_URL}/attractions?${params}`);
    return response.data.attractions;
  }
);

export const fetchAttractionById = createAsyncThunk(
  'attractions/fetchAttractionById',
  async (id) => {
    const response = await axios.get(`${API_URL}/attractions/${id}`);
    return response.data.attraction;
  }
);

export const updateAttraction = createAsyncThunk(
  'attractions/updateAttraction',
  async ({ id, data }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.put(`${API_URL}/attractions/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.attraction;
  }
);

export const createAttraction = createAsyncThunk(
  'attractions/createAttraction',
  async (data, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(`${API_URL}/attractions`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.attraction;
  }
);

export const deleteAttraction = createAsyncThunk(
  'attractions/deleteAttraction',
  async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`${API_URL}/attractions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  }
);

const initialState = {
  items: [],
  currentAttraction: null,
  status: 'idle',
  error: null,
  filters: {
    category: null,
    status: null,
    search: '',
  }
};

const attractionsSlice = createSlice({
  name: 'attractions',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateAttractionStatus: (state, action) => {
      const { id, status } = action.payload;
      const attraction = state.items.find(item => item.id === id);
      if (attraction) {
        attraction.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all attractions
      .addCase(fetchAttractions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single attraction
      .addCase(fetchAttractionById.fulfilled, (state, action) => {
        state.currentAttraction = action.payload;
      })
      // Update attraction
      .addCase(updateAttraction.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentAttraction?.id === action.payload.id) {
          state.currentAttraction = action.payload;
        }
      })
      // Create attraction
      .addCase(createAttraction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Delete attraction
      .addCase(deleteAttraction.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentAttraction?.id === action.payload) {
          state.currentAttraction = null;
        }
      });
  },
});

export const { setFilters, clearFilters, updateAttractionStatus } = attractionsSlice.actions;

export default attractionsSlice.reducer; 