import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { store } from './app/store';
import App from './App';
import { changeStatus, getBlogPosts, selectBlogPosts, blogPostStatusOptions, BlogPost, PostAndStatus } from './features/blogposts/blogPostsSlice';

const blogpostsResponse = [
	{
		id: '1111',
		title: 'How to prevent re-renderings when using useSelector hook',
		blogPostStatus: 'draft',
	},
	{
		id: '2222',
		title: 'How to prevent re-renderings when using Redux-Toolkit',
		blogPostStatus: 'draft',
	}
]

test('renders the Loading message', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Loading/i)).toBeInTheDocument();
});


describe('load the state from the API', () => {
  it('should pass', async () => {
	const getSpy = jest.spyOn(window, 'fetch')
		.mockImplementation(jest.fn(() => Promise.resolve(
		{ 
			json: () => { 
				console.log("getSpy: We are about to resolve a promise");
				return Promise.resolve(blogpostsResponse)
			}, 
		})
	, ) as jest.Mock);
    const store = configureStore({
      reducer: {
		  blogposts: function (state = '', action) {
			switch (action.type) {
			  case 'blogposts/getBlogPosts/fulfilled':
				console.log(`action.type = ${action.type} We are in getUserStories/fulfilled`);
				return action.payload;
			  case 'blogposts/getBlogPosts/rejected':
				console.log(`action.type = ${action.type} We are in getUserStories/rejected`);
				return action.payload;			
			  default:
				console.log(`action.type = ${action.type} We are in default`);
				return state;
			}
		  }
      },
    });
    await store.dispatch(getBlogPosts());
    expect(getSpy).toBeCalledWith('https://api.geekitude.com/api/blogposts');
    const state = store.getState();
    expect(state).toEqual({blogposts: blogpostsResponse});
  });
});
