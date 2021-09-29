import { ProjectId } from '@/type';
import React, { createContext, useContext } from 'react';
import { useTasks } from '../utils/hooks';

export const TasksContext: React.Context<ReturnType<typeof useTasks>> = createContext('provider' as any);

export const TasksProvider = ({
  children,
  selectedProject,
}: {
  children: React.ReactNode;
  selectedProject: ProjectId;
}) => {
  const { tasks, setTasks } = useTasks(selectedProject);

  return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>;
};

export const useTasksValue = () => useContext(TasksContext);
