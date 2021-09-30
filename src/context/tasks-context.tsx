import React, { createContext, useContext } from 'react';
import { useTasks } from '@/utils/hooks';
import type { ProjectId, ProviderProps } from '@/type';

export const TasksContext = createContext<ReturnType<typeof useTasks>>(null as any);

export const TasksProvider: React.FC<ProviderProps & { currentProject: ProjectId }> = (props) => {
  return <TasksContext.Provider value={useTasks(props.currentProject)}>{props.children}</TasksContext.Provider>;
};

export const useTasksContext = () => useContext(TasksContext);
