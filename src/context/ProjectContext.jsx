import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects 
  const refreshProjects = async () => {
    setLoading(true);
    try {
      const { data } = await projectService.getAll();
      const projectsArray = data?.data || [];
      setProjects(projectsArray);

    } catch (err) {
      console.error("Error fetching projects:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  //Project Actions
  const addProject = async (formData) => {
    const { data } = await projectService.create(formData);
    setProjects((prev) => [data, ...prev]);
  };
  
  const updateProject = async (id, updatedData) => {
    setLoading(true);
    try {
      const { data } = await projectService.update(id, updatedData);

      setProjects((prev) =>
        prev.map((p) => (p._id === id ? data.data : p))
      );
    } catch (err) {
      console.error("Update Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");

    if (!isConfirmed) {
      return;
    }
   
    try {
      await projectService.delete(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
     
    }
  };

  // Task Actions 
  const addTaskToProject = async (projectId, taskData) => {
    const { data } = await taskService.create(projectId, taskData);

    refreshProjects();
    return data;
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      addTaskToProject,
      refreshProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

