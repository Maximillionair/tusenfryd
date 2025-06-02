import { configureStore } from '@reduxjs/toolkit';
import attractionsReducer from './slices/attractionsSlice';
import authReducer from './slices/authSlice';
import queueReducer from './slices/queueSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    attractions: attractionsReducer,
    auth: authReducer,
    queue: queueReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/connected', 'socket/disconnected'],
        ignoredActionPaths: ['payload.socket'],
        ignoredPaths: ['socket'],
      },
    }),
});

export default store; 