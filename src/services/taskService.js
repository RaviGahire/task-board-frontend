import API from './api';

export const taskService = {
  
  create: (projectId, data) => API.post(`/api/tasks/project/${projectId}/tasks`, data),
  
  update: (taskId, data) => API.put(`/api/tasks/${taskId}`, data),
  
  delete: (taskId) => API.delete(`/api/tasks/${taskId}`),

  getByProjectId: (projectId) => API.get(`/api/tasks/project/${projectId}/tasks`)
};