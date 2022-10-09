import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userStoriesReducer from '../features/userstories/userStoriesSlice';

export const store = configureStore({
  reducer: {
	userstories: userStoriesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
