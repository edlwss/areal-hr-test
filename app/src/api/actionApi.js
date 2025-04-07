import api from './axiosInstance';

export const getActions = () => api.get('/actions');
