import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queues: {},
  loading: false,
  error: null,
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    updateQueueStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateQueueSuccess: (state, action) => {
      state.loading = false;
      const { attractionId, waitTime } = action.payload;
      state.queues[attractionId] = waitTime;
    },
    updateQueueFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateQueueStart,
  updateQueueSuccess,
  updateQueueFailure,
} = queueSlice.actions;

export default queueSlice.reducer; 