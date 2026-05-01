import React, { createContext, useContext, useState } from 'react';
import { commentService } from '../services/commentService';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // Requirement: POST /api/tasks/{taskId}/comments
  const addComment = async (taskId, author, body) => {
    try {
      const payload = { 
        author: author.substring(0, 50), // Requirement: Max 50 chars
        body: body.substring(0, 500)     // Requirement: Max 500 chars
      };
      const { data } = await commentService.add(taskId, payload);
      setComments((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // Requirement: DELETE /api/comments/{id}
  const removeComment = async (commentId) => {
    try {
      await commentService.delete(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, setComments, addComment, removeComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);