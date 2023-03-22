import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import BlogPostsComponent from './features/blogposts/BlogPostsComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import blogPostsReducer, {BlogPostStatus} from './features/blogposts/blogPostsSlice';

import axios from "axios";

import { store } from './app/store';
import App from './App';
import { changeStatus, getBlogPosts, selectBlogPosts, blogPostStatusOptions, BlogPost, PostAndStatus } from './features/blogposts/blogPostsSlice';

jest.mock("axios");

const blogPosts = [
	{
		id: '1111',
		title: 'How to prevent re-renderings when using useSelector hook',
		blogPostStatus: 'draft' as BlogPostStatus,
	},
	{
		id: '2222',
		title: 'How to prevent re-renderings when using Redux-Toolkit',
		blogPostStatus: 'draft' as BlogPostStatus,
	}
];

const blogpostsResponse = {
	data: blogPosts
};


it("renders blogpost data", async () => {
	(axios.get as jest.Mock).mockResolvedValue(blogpostsResponse);
	const { findByText, findByTestId } = render(  
	<Provider store={store}>
	  <App />
	</Provider>
	);

	const bpHeader = await findByTestId('blog-posts-header');
	console.log(`result of findByTestId : bpHeader.tagName = ${bpHeader.tagName} bpHeader.textContent = ${bpHeader.textContent}`);
	expect(bpHeader).toBeTruthy();
	expect(bpHeader.tagName).toBe("H2");
	expect(bpHeader.textContent).toBe("Blog Posts");

	const bpUseSelector = await findByText(/useSelector hook/);
	console.log(`result of findByText : bpUseSelector.tagName = ${bpUseSelector.tagName} bpUseSelector.textContent = ${bpUseSelector.textContent}`);
	expect(bpUseSelector).toBeTruthy();
	expect(bpUseSelector.tagName).toBe("DIV");
	expect(bpUseSelector.textContent).toBe("How to prevent re-renderings when using useSelector hook");  
});

describe('load the state from the API', () => {
  it('should set the state to blogposts list when axios returns a resolved value', async () => {
	(axios.get as jest.Mock).mockResolvedValue(blogpostsResponse);
    const store = configureStore({
	  reducer: {
		blogposts: blogPostsReducer
	  },	  
    });
	await act(async () => {
		store.dispatch(getBlogPosts());
	});
	expect(axios.get).toBeCalledWith('https://api.geekitude.com/api/blogposts');
    const state = store.getState();
	expect(state).toEqual(
	{
		blogposts: {
			entities: blogPosts,
			error: undefined,
			ids: [1111, 2222],
			loading: false,		
		}
	});
  });
  
  it('should set the error in the state to the error in the axios.get rejected value', async () => {
	const message = "Request failed";
	(axios.get as jest.Mock).mockRejectedValue(message);
    const store = configureStore({
	  reducer: {
		blogposts: blogPostsReducer
	  },	  	  
    });
	await act(async () => {
		store.dispatch(getBlogPosts());
	});
	expect(axios.get).toBeCalledWith('https://api.geekitude.com/api/blogposts');
    const state = store.getState();
	console.log(`Before the expect: state = ${JSON.stringify(state)}`);	
	expect(state.blogposts.error).toEqual(message);
	expect(state).toEqual(
	{
		blogposts: {
			entities: [],
			error: message,
			ids: [],
			loading: false,		
		}
	});	
	
  });  
});

describe('Change a blogpost status', () => {
  it('should update the state to reflect a new blogpost status when a blogpost status is changed', async () => {
    const store = configureStore({
	  reducer: {
		blogposts: blogPostsReducer
	  },
	  preloadedState: {
		blogposts: {
			entities: blogPosts,
			error: undefined,
			ids: [1111, 2222],
			loading: false
		}	
	  }		  
    });
	const newBlogPosts = [
	{
		id: '1111',
		title: 'How to prevent re-renderings when using useSelector hook',
		blogPostStatus: 'draft',
	},
	{
		id: '2222',
		title: 'How to prevent re-renderings when using Redux-Toolkit',
		blogPostStatus: 'published',
	}
	];
	
	const newStatus: PostAndStatus = { id: '2222', blogPostStatus: 'published'};	
	await act(async () => {
		store.dispatch(changeStatus(newStatus));
	});	
    const state = store.getState();
	expect(state).toEqual(
	{
		blogposts: {
			entities: newBlogPosts,
			error: undefined,
			ids: [1111, 2222],
			loading: false,		
		}
	});
  });
});  