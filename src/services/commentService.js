import API from './api';

export const commentService = {
  add: (taskId, commentData) => API.post(`/comments/tasks/${taskId}/comments`, commentData),
  getComments: (taskId)=>API.get(`/comments/tasks/${taskId}/comments`),
  delete: (commentId) => API.delete(`/comments/${commentId}`),
};