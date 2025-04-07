import api from './axiosInstance';

export const getDocumentsByWorkerId = (workerId) => api.get(`/worker/${workerId}/documents`);
export const uploadDocument = (formData) =>
    api.post('/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteDocument = (id) => api.delete(`/document/${id}`);
