import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { UNAUTHENTICATED, AUTHENTICATED, AUTHENTICATION_ERROR } from '../type';

const URL = process.env.REACT_APP_BACK_END_URL;

export const signInAction = ({ username, password }, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`${URL}/v1/login`, {
        username,
        password
      });
      dispatch({ type: AUTHENTICATED });
      // console.log(jwtDecode(data.accessToken));
      const userInfo = jwtDecode(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      history.push('/dashboard');
    } catch (error) {
      dispatch({ type: AUTHENTICATION_ERROR, payload: error });
    }
  };
};

export const signOutAction = history => {
  return dispatch => {
    dispatch({ type: UNAUTHENTICATED });
    localStorage.clear();
    history.push('/sign-in');
  };
};
