This application was created for a presentation at the Women Who Code ATX chapter. It illustrates React.js Redux-toolkit. The presentation slides are here: 

http://geekitude.com/Presentations/20221013-ReactReduxToolkit/index.html

It is deployed at https://redux-toolkit-tickets.vercel.app/ (`main` branch).

The branch `20221011-List` is deployed at https://redux-toolkit-tickets-elze.vercel.app/ . In this branch, there is just one component that has a list of all the user stories. However, in the `main` branch, each user story is in its own separate component. I'm trying to figure out why the parent component and all the children components re-render when I change the state of only one child component.

To get just the most basic application code, you can checkout the tag 1.0. That version has only the async actions, and all it does is it gets data from the backend and displays it.

This application has a backend and a frontend. You don't have to run the backend server, but you can. Currently, the backend API is hosted on my website. If you want to run the backend server locally, you can start it the following way (assuming you are in the top-level directory of this application):

`cd api`

`npm install`

`node index.js`

Then, open `src/features/userstories/userStoriesSlice.ts`, comment out the line

`const res = await fetch('https://api.geekitude.com/api/userStories').then(`

and uncomment the line

`const res = await fetch('api/userstories').then(`

Then, in a separate terminal window, `cd` to the top-level directory of this application, and follow the standard instructions below to start the frontend server.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
