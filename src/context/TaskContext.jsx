import React, { createContext, useContext, useState } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Set initial tasks (usually called from ProjectDetail page)
  const setProjectTasks = (initialTasks) => setTasks(initialTasks);

  const updateTask = async (taskId, formData) => {
    try {
      const { data } = await taskService.update(taskId, formData);
      setTasks((prev) => prev.map((t) => (t._id === taskId ? data : t)));
    } catch (err) {
      console.error("Task update failed", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Task deletion failed", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setProjectTasks, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

