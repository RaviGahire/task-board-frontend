import { useState } from 'react';
import axios from 'axios';

export const useComments = (taskId, initialComments = []) => {
  
  const [comments, setComments] = useState(initialComments);

  const addComment = async (author, body) => {
   
    try {
      const { data } = await axios.post(`/api/tasks/${taskId}/comments`, { 
        author: author.substring(0, 50), 
        body: body.substring(0, 500) 
      });
      setComments((prev) => [data, ...prev]);

    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  const removeComment = async (commentId) => {
    await axios.delete(`/api/comments/${commentId}`);
    setComments((prev) => prev.filter(c => c._id !== commentId));
  };

  return { comments, addComment, removeComment };
};