import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import friendReducer from './reducers/friendReducer';
import postReducer from './reducers/postReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
