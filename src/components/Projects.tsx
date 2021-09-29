import React from 'react';
import { useSelectedProjectValue, useProjectsValue } from '@/context';
import { IndividualProject } from './IndividualProject';
import styles from '@/styles/sidebar.module.scss';

export const Projects: React.FC = () => {
  const { setSelectedProject, selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
      {projects.map((item) => (
        <li
          key={item.id}
          className={`${styles.sidebar__project} ${selectedProject === item.id ? styles.active : ''}`}
          role='button'
          tabIndex={0}
          onClick={() => setSelectedProject(item.id)}
          onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(item.id)}
        >
          <IndividualProject project={item} />
        </li>
      ))}
    </>
  );
};
