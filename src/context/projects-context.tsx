import React, { createContext, useContext } from 'react';
import { useProjects } from '../utils/hooks';

export const ProjectsContext: React.Context<ReturnType<typeof useProjects>> = createContext('provider' as any);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const { projects, setProjects } = useProjects();

  return <ProjectsContext.Provider value={{ projects, setProjects }}>{children}</ProjectsContext.Provider>;
};

export const useProjectsValue = () => useContext(ProjectsContext);
