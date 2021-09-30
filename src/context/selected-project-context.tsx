import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_PROJECT } from '@/utils/const';
import type { ProjectId, ProviderProps } from '@/type';

export const CurrentProjectContext: React.Context<[ProjectId, React.Dispatch<React.SetStateAction<ProjectId>>]> =
  createContext('provider' as any);

export const CurrentProjectProvider: React.FC<ProviderProps> = (props) => {
  return (
    <CurrentProjectContext.Provider value={useState<ProjectId>(DEFAULT_PROJECT.INBOX)}>
      {props.children}
    </CurrentProjectContext.Provider>
  );
};

export const useCurrentProjectContext = () => useContext(CurrentProjectContext);
