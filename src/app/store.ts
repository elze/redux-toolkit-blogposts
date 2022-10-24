import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blogPostsReducer from '../features/blogposts/blogPostsSlice';

export const store = configureStore({
  reducer: {
	blogposts: blogPostsReducer
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
