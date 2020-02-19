import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
  UNAUTHENTICATED
} from '../../actions/SignIn';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticate: true };
    case UNAUTHENTICATED:
      return { ...state, authenticate: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
