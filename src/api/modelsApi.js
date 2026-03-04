import API from './axiosInstance';

export const getAllModels = () => API.get('/Models');
export const getModelById = (id) => API.get(`/Models/${id}`);
export const createModel = (data) => API.post('/Models', data);
export const updateModel = (id, data) => API.put(`/Models/${id}`, data);
export const deleteModel = (id) => API.delete(`/Models/${id}`);
