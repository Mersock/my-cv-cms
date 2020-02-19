import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const URL = 'http://localhost:3400';

export const signInAction = ({ username, password }, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`${URL}/v1/login`, {
        username,
        password
      });
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('tokenType', data.tokenType);
      localStorage.setItem('accessToken', data.accessToken);
      history.push('/dashboard');
    } catch (error) {
      dispatch({ type: AUTHENTICATION_ERROR, payload: error });
    }
  };
};
