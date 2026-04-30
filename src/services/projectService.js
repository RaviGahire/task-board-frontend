import API from './api';

export const projectService = {

  getAll: () => API.get('/projects'),

  getById: (id) => API.get(`/projects/${id}`),

  create: (data) => API.post('/projects', data),

  update: (id, data) => API.put(`/projects/${id}`, data),
  
  delete: (id) => API.delete(`/projects/${id}`),
};