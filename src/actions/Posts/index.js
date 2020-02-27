import axios from 'axios';
import { GET_POSTS, ERROR_POSTS } from '../type';

const URL = process.env.REACT_APP_BACK_END_URL;

export const getPosts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${url}/v1/posts`);
      console.log(data);
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error });
    }
  };
};
