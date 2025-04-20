import api from './axiosInstance';

export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/user/${id}`);
export const createUser = (data) => api.post('/user', data);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);
