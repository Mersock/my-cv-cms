import { combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducers';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
