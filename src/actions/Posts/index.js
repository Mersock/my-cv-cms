import axios from 'axios';
import { GET_POSTS, ERROR_POSTS } from '../type';

const URL = process.env.REACT_APP_BACK_END_URL;

export const getPosts = (params = {}) => {
  return async dispatch => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      console.log(queryParams);
      const { data } = await axios.get(
        `${URL}/v1/posts${queryParams ? `?${queryParams}` : ''}`
      );
      dispatch({ type: GET_POSTS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error });
    }
  };
};
