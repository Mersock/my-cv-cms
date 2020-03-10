import { GET_POSTS, CREATE_POSTS, ERROR_POSTS } from '../../actions/type';

const initailState = {
  data: [],
  meta: {}
};

export default (state = initailState, action) => {
  switch (action.type) {
    case GET_POSTS:
      const { data, meta } = action.payload;
      return {
        data,
        meta
      };
    case CREATE_POSTS:
      return {
        ...state,
        create: action.payload
      };
    case ERROR_POSTS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
