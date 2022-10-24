import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
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
  loading: boolean
}

const initialState: BlogPostsState = {
  entities: [],
  loading: false,
}

export const getBlogPosts = createAsyncThunk(
  'blogposts/getBlogPosts',
  async (thunkAPI) => {
    // const res = await fetch('api/blogposts').then(
	const res = await fetch('https://api.geekitude.com/api/blogposts').then(
    (data) => data.json()
  )
  return res
})

export const blogPostsSlice = createSlice({
  name: 'blogposts',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<PostAndStatus>) => {
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
      })
      .addCase(getBlogPosts.rejected, (state, action) => {
		  console.log(`We are in getBlogPosts.rejected: action = ${action} action.payload = ${action.payload} action.error = ${JSON.stringify(action.error)}`);
		state.loading = false;
      });
  },  
})

export const { changeStatus } = blogPostsSlice.actions;

export const selectBlogPosts = (state: RootState) => state.blogposts;

export const selectBlogPost = (id: number) => (state: RootState) => state.blogposts.entities[id];

export default blogPostsSlice.reducer;