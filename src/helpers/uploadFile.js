import axios from 'axios';

export default async (file = {}) => {
  const token = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post(
    `${process.env.REACT_APP_STORAGE_URL}/v1/upload/posts`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Beare ${token}`
      }
    }
  );
  return data;
};
