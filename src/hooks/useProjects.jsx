import { useState, useEffect } from 'react';
import { projectService } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //ftech all project data
  const fetchProjects = async () => {
    try {
      const { data } = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  // add project
  const addProject = async (projectData) => {
    const { data } = await projectService.create(projectData);
    setProjects((prev) => [data, ...prev]);
  };

  //update project
  const updateProject = async (id, projectData) => {
    const { data } = await projectService.update(id, projectData);
    setProjects((prev) => prev.map(p => p._id === id ? data : p));
  };

  //delete project
  const deleteProject = async (id)=>{
    const {data} = await projectService.delete(id)
    setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id))
    
  }
  useEffect(() => { fetchProjects(); }, []);

  return { projects, loading, addProject, updateProject,deleteProject };
};