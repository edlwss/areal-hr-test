import api from './axiosInstance';

export const getDepartments = () => api.get('/departments');
export const getDepartmentById = (id) => api.get(`/department/${id}`);
export const createDepartment = (data) => api.post('/department', data);
export const updateDepartment = (id, data) => api.put(`/department/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/department/${id}`);
