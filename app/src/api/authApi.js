import axios from './axiosInstance.js';

export const login = async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

export const getSessionUser = async () => {
  const response = await axios.get('/me');
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/logout');
  return response.data;
};
