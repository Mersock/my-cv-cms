import { GET_POSTS } from '../../actions/type';

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
    default:
      return state;
  }
};
