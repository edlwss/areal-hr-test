import api from './axiosInstance';

export const createHrOperation = (data) => api.post('/hr_operation', data);
export const getWorkerHrOperations = (workerId) => api.get(`/hr_operations/worker/${workerId}`);
export const deleteHrOperation = (id) => api.delete(`/hr_operations/${id}`);
