import api from './axiosInstance';

export const getWorkers = () => api.get('/workers');
export const getWorkerById = (id) => api.get(`/worker/${id}`);
export const createWorker = (data) => api.post('/worker', data);
// export const updateWorker = (id, data) => api.put(`/worker/${id}`, data);
export const deleteWorker = (id) => api.delete(`/worker/${id}`);
