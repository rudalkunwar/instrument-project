import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Import named export 'thunk' from 'redux-thunk'
import rootReducer from './reducer/index';

// Create the Redux store with middleware applied
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
