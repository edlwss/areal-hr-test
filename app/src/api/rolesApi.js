import api from './axiosInstance';

export const getRoles = () => api.get('/roles');
