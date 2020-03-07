import { combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducers';
import postsReducer from '../reducers/Posts';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer
});

export default rootReducer;
