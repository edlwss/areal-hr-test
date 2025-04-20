import api from './axiosInstance';

export const getChangeHistory = () => api.get('/change-logger');
