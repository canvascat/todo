import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_PROJECT } from '@/utils/const';
import type { ProjectId } from '@/type';

export const SelectedProjectContext: React.Context<{
  selectedProject: ProjectId;
  setSelectedProject: Function;
}> = createContext('provider' as any);

export const SelectedProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectId>(DEFAULT_PROJECT.INBOX);

  return (
    <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
