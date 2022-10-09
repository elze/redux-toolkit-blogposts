import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export enum ImageUrl {
	ToDoImage = 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_01_ToDo.jpg',
	ReadyForDevelopmentImage = 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_02_ReadyForDevelopment.jpg',
	InDevelopmentImage = 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_03_InDevelopment.jpg',
	ReadyForTestingImage = 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_04_ReadyForTesting.png',
	InQAImage = 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_05_InQA.jpg',
	InPOReview = 'https://blog.geekitude.com/wp-content/uploads/2022/10/TicketStage_06_InPOReview.png',
	DoneImage =  'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_06_Done.jpg'
};


export enum PhaseNames {
	toDo = 'To Do',
	readyForDevelopment = 'Ready for Development',
	inDevelopment = 'In Development',
	readyForTesting = 'Ready for Testing',
	inQA = 'In QA',
	inPOReview = 'In Product Owner Review',
	done =  'Done'
};

export interface UserStory {
	id: string;
	title: string;
	phase: 'toDo' | 'readyForDevelopment' | 'inDevelopment' | 'readyForTesting' | 'inQA' | 'done';
	imageUrl: string;  
}

export interface UserStoriesState {
  entities: UserStory[],
  loading: boolean 
}

const initialState: UserStoriesState = {
  entities: [],
  loading: false,
}

export const getUserStories = createAsyncThunk(
  'userstories/getUserStories',
  async (thunkAPI) => {
    const res = await fetch('api/userstories').then(
    (data) => data.json()
  )
  return res
})


export const userStoriesSlice = createSlice({
  name: 'userstories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserStories.pending, (state) => {
		state.loading = true
      })
      .addCase(getUserStories.fulfilled, (state, action) => {
		state.loading = false
        state.entities = action.payload;
      })
      .addCase(getUserStories.rejected, (state) => {
		state.loading = false
      });
  },  
})

export const selectUserStories = (state: RootState) => state.userstories;

export default userStoriesSlice.reducer;