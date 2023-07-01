import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../../app/store';

export enum StatusNames {
	draft = 'Draft',
	published = 'Published',
	removed = 'Removed',	
	scheduledToBePublished = 'Scheduled To Be Published',
};
 
export const blogPostStatusOptions = [
{ label: StatusNames.draft, value: 'draft'},
{ label: StatusNames.published, value: 'published'},	
{ label: StatusNames.removed, value: 'removed'},
{ label: StatusNames.scheduledToBePublished, value: 'scheduledToBePublished'}
];

export type BlogPostStatus = 'draft' | 'published' | 'removed' | 'scheduledToBePublished';

export interface BlogPost {
	id: string;
	title: string;
	blogPostStatus: BlogPostStatus;
}

export interface PostAndStatus {
	id: string;
	blogPostStatus: BlogPostStatus;
}

export interface BlogPostsState {
  entities: BlogPost[],
  ids: number[],
  loading: boolean,
  error: string | undefined
}

export interface BlogPostsIds {
  ids: number[],
  loading: boolean,
  error: string | undefined
}

const initialState: BlogPostsState = {
  entities: [],
  ids: [],
  loading: false,
  error: undefined
}

export const getBlogPosts = createAsyncThunk(
  'blogposts/getBlogPosts',
  async (thunkAPI) => {
	const res = axios.get('https://api.geekitude.com/api/blogposts', { headers: {'cache-control': 'no-cache'} }).then((response) => {		
	// const res = axios.get('api/blogposts').then((response) => {			
      return response.data;
    });	
  return res
})

export const blogPostsSlice = createSlice({
  name: 'blogposts',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<PostAndStatus>) => {
		console.log(`blogPostsSlice: state = ${JSON.stringify(state)}`);
		console.log(`blogPostsSlice: action.payload.blogPostStatus = ${action.payload.blogPostStatus}`);
		const id = action.payload.id;
		
		const blogPostStatus = action.payload.blogPostStatus;		
		const ind = state.entities.findIndex((elem: BlogPost) => {
			return elem.id === id
		});
		if (ind > -1) {		
			state.entities[ind].blogPostStatus = blogPostStatus;
		}
    },	 	  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogPosts.pending, (state) => {
		state.loading = true
      })
      .addCase(getBlogPosts.fulfilled, (state, action) => {
		state.loading = false
        state.entities = action.payload;
		console.log(`We are in getBlogPosts.fulfilled: action = ${JSON.stringify(action)} action.payload = ${JSON.stringify(action.payload)}}`);
		state.ids = state.entities.map((elem: BlogPost) => parseInt(elem.id));
      })
      .addCase(getBlogPosts.rejected, (state, action) => {
		  console.log(`We are in getBlogPosts.rejected: action = ${action} action.payload = ${action.payload} action.error.message = ${JSON.stringify(action.error.message)}`);
		state.loading = false;
		state.entities = [];
		state.ids = [];
		state.error = action.error.message;
      });
  },  
})

export const { changeStatus } = blogPostsSlice.actions;

export const selectBlogPosts = (state: RootState) => state.blogposts;

export const selectBlogPostsIds = (state: RootState) => <BlogPostsIds>{ids: state.blogposts.ids, loading: state.blogposts.loading, error: state.blogposts.error};

export const selectBlogPost = (id: number) => (state: RootState) => state.blogposts.entities[id];

export default blogPostsSlice.reducer;