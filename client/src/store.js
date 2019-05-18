//this is the redux store

//importing the dependancies
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//the middleware for the store
const middleware= [thunk];

//the initial state
const initialState = {};

//creating the store
const store = createStore(
     rootReducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
);
     

//exporting the store
export default store;
