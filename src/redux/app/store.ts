import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/userSlice';
import favouriteUserReducer from '../store/favouriteUserSlice';

const rootReducer = combineReducers({
  users: userReducer,
  favouriteUsers: favouriteUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
