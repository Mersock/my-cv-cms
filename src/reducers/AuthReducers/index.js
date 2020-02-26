import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
  UNAUTHENTICATED
} from '../../actions/type';

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const initialState = userInfo ? {authenticate:true,userInfo} :{}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { 
        authenticate: true,
        userInfo:action.payload
       };
    case UNAUTHENTICATED:
      return { 
        authenticate: false,
        userInfo:{}
      };
    case AUTHENTICATION_ERROR:
      return {
        authenticate: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};
