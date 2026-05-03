import API from './api';

export const commentService = {
  add: (taskId, commentData) => API.post(`/api/comments/tasks/${taskId}/comments`, commentData),
  getComments: (taskId)=>API.get(`/api/comments/tasks/${taskId}/comments`),
  delete: (commentId) => API.delete(`/api/comments/${commentId}`),
};