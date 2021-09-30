import React from 'react';
import { useCurrentProjectContext, TasksProvider } from '@/context';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content: React.FC = () => {
  const [currentProject] = useCurrentProjectContext();
  return (
    <TasksProvider currentProject={currentProject}>
      <section className='content'>
        <Sidebar />
        <Tasks />
      </section>
    </TasksProvider>
  );
};
