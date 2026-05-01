import { useState, useEffect } from 'react';
import { taskService, projectService } from '../services/api';

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!projectId) return;

    const fetchTasks = async () => {
      try {
        const { data } = await projectService.getById(projectId);
        setTasks(data.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  const addTask = async (taskData) => {
    const { data } = await taskService.create(projectId, taskData);
    setTasks((prev) => [...prev, data]);
  };

  const deleteTask = async (taskId) => {
    await taskService.delete(taskId);
    setTasks((prev) => prev.filter(t => t._id !== taskId));
  };

  return { tasks, loading, addTask, deleteTask };
};