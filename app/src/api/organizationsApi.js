import api from './axiosInstance';

export const getOrganizations = () => api.get('/organizations');
export const getOrganizationById = (id) => api.get(`/organization/${id}`);
export const createOrganization = (data) => api.post('/organization', data);
export const updateOrganization = (id, data) => api.put(`/organization/${id}`, data);
export const deleteOrganization = (id) => api.delete(`/organization/${id}`);
