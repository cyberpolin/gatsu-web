import fetch from '../fetch';
import { useEffect, useState } from 'react';

export type Project = {
  id?: string;
  name: string;
  description: string;
  clientId?: string;
};

const url = '/projects';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjectsByClient = async (id?: string) => {
    try {
      const { data } = await fetch.get(`${url}/client/${id}`);
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const { data } = await fetch.get(`${url}`);
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProject = async (id: string) => {
    const { data } = await fetch.get(`${url}/${id}`);
    return data;
  };

  const addProject = async (payload: Project, cb?: () => void) => {
    await fetch.post(url, payload);
    cb && cb();
    getProjects();
  };

  const updateProject = async (id: string, payload: Project) => {
    await fetch.put(`${url}/${id}`, payload);
    getProjects();
  };

  const deleteProject = async (id: string) => {
    await fetch.delete(`${url}/${id}`);
    getProjects();
  };

  return {
    projects,
    getProjects,
    getProject,
    getProjectsByClient,
    addProject,
    updateProject,
    deleteProject,
  };
};

export default useProjects;
