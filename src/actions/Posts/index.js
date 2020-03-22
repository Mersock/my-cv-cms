import axios from 'axios';
import {
  GET_POSTS,
  ERROR_POSTS,
  CREATE_POSTS,
  GET_BY_ID,
  UPDATE_POSTS
} from '../type';
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
      const { id } = JSON.parse(user);
      params.author = id;
      const { data } = await axios.post(`${URL}/v1/posts`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beare ${token}`
        }
      });
      if (file && data.data.id) {
        const fileData = await uploadFile(file);
        params.imagesUrl = fileData.data.imagesPath;
        axios.patch(`${URL}/v1/posts/${data.data.id}`, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Beare ${token}`
          }
        });
      }
      dispatch({ type: CREATE_POSTS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ERROR_POSTS,
        payload: error.response.data.errors.errors
      });
    }
  };
};

export const getPostsById = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${URL}/v1/posts/${id}`, {
        headers: {
          Authorization: `Beare ${token}`,
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: GET_BY_ID, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error });
    }
  };
};

export const updatePosts = (params = {}, file = {}, postId) => {
  return async dispatch => {
    try {
      const { id } = JSON.parse(user);
      params.author = id;
      const { data } = await axios.patch(`${URL}/v1/posts/${postId}`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beare ${token}`
        }
      });
      if (file) {
        const fileData = await uploadFile(file);
        params.imagesUrl = fileData.data.imagesPath;
        axios.patch(`${URL}/v1/posts/${postId}`, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Beare ${token}`
          }
        });
      }
      dispatch({ type: UPDATE_POSTS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ERROR_POSTS,
        payload: error.response.data.errors.errors
      });
    }
  };
};
