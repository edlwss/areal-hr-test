import api from './axiosInstance';

export const getPositions = () => api.get('/positions');
export const getPositionById = (id) => api.get(`/position/${id}`);
export const createPosition = (data) => api.post('/position', data);
export const updatePosition = (id, data) => api.put(`/position/${id}`, data);
export const deletePosition = (id) => api.delete(`/position/${id}`);
