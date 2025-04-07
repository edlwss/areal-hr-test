import api from './axiosInstance';

export const getHrOperations = () => api.get('/hr_operations');
export const getHrOperationById = (id) => api.get(`/hr_operation/${id}`);
export const createHrOperation = (data) => api.post('/hr_operation', data);
export const updateHrOperation = (id, data) => api.put(`/hr_operations/${id}`, data);
export const deleteHrOperation = (id) => api.delete(`/hr_operations/${id}`);
