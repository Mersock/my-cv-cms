import { GET_POSTS } from '../../actions/type';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        data: action.payload
      };
    default:
      return state;
  }
};
