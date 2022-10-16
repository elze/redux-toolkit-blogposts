import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { store } from './app/store';
import App from './App';
import mockFetch from './mocks/mockFetch';
import { changeStage, getUserStories, selectUserStories, stageOptions, UserStory, UserStoryStage } from './features/userstories/userStoriesSlice'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Loading/i)).toBeInTheDocument();
});

/*
describe('67087596', () => {
  it('should pass', async () => {
    const nameAndEmail = {
      name: 'John Smith',
      email: '123@123.com',
    };
    const getSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
    const store = configureStore({
      reducer: {
		  userstories: function (state = '', action) {
			switch (action.type) {
			  case 'userstories/getUserStories/fulfilled':
				console.log(`action.type = ${action.type} We are in getUserStories/fulfilled`);
				return action.payload;
			  case 'userstories/getUserStories/rejected':
				console.log(`action.type = ${action.type} We are in getUserStories/rejected`);
				return action.payload;			
			  default:
				console.log(`action.type = ${action.type} We are in default`);
				return state;
			}
		  }
      },
    });
    await store.dispatch(getUserStories());
    expect(getSpy).toBeCalledWith('api/userstories');
    const state = store.getState();
    expect(state).toEqual('1');
  });
});
*/