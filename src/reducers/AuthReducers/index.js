import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
  UNAUTHENTICATED
} from '../../actions/SignIn/type';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticate: true };
    case UNAUTHENTICATED:
      return { ...state, authenticate: false };
    case AUTHENTICATION_ERROR:
      // console.log(action.payload);
      return { ...state, authenticate: false };
    default:
      return state;
  }
};
