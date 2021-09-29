import React from 'react';
import { useSelectedProjectValue, TasksProvider } from '@/context';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content: React.FC = () => {
  const { selectedProject } = useSelectedProjectValue();
  return (
    <TasksProvider selectedProject={selectedProject}>
      <section className='content'>
        <Sidebar />
        <Tasks />
      </section>
    </TasksProvider>
  );
};
