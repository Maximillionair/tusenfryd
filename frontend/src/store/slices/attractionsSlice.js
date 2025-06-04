import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attractions: [],
  selectedAttraction: null,
  loading: false,
  error: null,
};

const attractionsSlice = createSlice({
  name: 'attractions',
  initialState,
  reducers: {
    fetchAttractionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAttractionsSuccess: (state, action) => {
      state.loading = false;
      state.attractions = action.payload;
    },
    fetchAttractionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectAttraction: (state, action) => {
      state.selectedAttraction = action.payload;
    },
  },
});

export const {
  fetchAttractionsStart,
  fetchAttractionsSuccess,
  fetchAttractionsFailure,
  selectAttraction,
} = attractionsSlice.actions;

export default attractionsSlice.reducer; 