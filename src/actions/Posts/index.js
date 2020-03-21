import axios from 'axios';
import { GET_POSTS, ERROR_POSTS, CREATE_POSTS } from '../type';
import { uploadFile } from '../../helpers';

const URL = process.env.REACT_APP_BACK_END_URL;
const token = localStorage.getItem('accessToken');
const user = localStorage.getItem('userInfo');

export const getPosts = (params = {}) => {
  return async dispatch => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const { data } = await axios.get(
        `${URL}/v1/posts${queryParams ? `?${queryParams}` : ''}`,
        {
          headers: { Authorization: `Beare ${token}` }
        }
      );
      dispatch({ type: GET_POSTS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error });
    }
  };
};

export const createPosts = (params = {}, file = {}) => {
  return async dispatch => {
    try {
      if (file) {
        const fileData = await uploadFile(file);
        params.imagesUrl = fileData.data.imagesPath;
      }
      const { id } = JSON.parse(user);
      params.author = id;
      const { data } = await axios.post(`${URL}/v1/posts`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beare ${token}`
        }
      });
      dispatch({ type: CREATE_POSTS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error.response.data.errors });
    }
  };
};
