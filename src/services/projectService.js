import API from './api';

export const projectService = {

  getAll: () => API.get('/api/projects'),

  getById: (id) => API.get(`/api/projects/${id}`),

  create: (data) => API.post('/api/projects', data),

  update: (id, data) => API.put(`/api/projects/${id}`, data),
  
  delete: (id) => API.delete(`/api/projects/${id}`),
};