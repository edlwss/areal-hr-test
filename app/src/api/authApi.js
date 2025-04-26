import axios from './axiosInstance.js';

export const login = async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
};
