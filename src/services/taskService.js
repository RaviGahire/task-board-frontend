import API from './api';

export const taskService = {
  
  create: (projectId, data) => API.post(`/tasks/project/${projectId}/tasks`, data),
  
  update: (taskId, data) => API.put(`/tasks/${taskId}`, data),
  
  delete: (taskId) => API.delete(`/tasks/${taskId}`),

  getByProjectId: (projectId) => API.get(`/tasks/project/${projectId}/tasks`)
};