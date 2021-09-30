import React, { createContext, useContext } from 'react';
import { useProjects } from '@/utils/hooks';
import type { ProviderProps } from '@/type';

export const ProjectsContext: React.Context<ReturnType<typeof useProjects>> = createContext('provider' as any);

export const ProjectsProvider: React.FC<ProviderProps> = (props) => {
  const [projects, setProjects] = useProjects();

  return <ProjectsContext.Provider value={[projects, setProjects]}>{props.children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => useContext(ProjectsContext);
