import { combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducers';
import userInfoReducer from '../reducers/UserInfoReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userInfoReducer
});

export default rootReducer;
