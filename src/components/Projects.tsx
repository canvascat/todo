import React from 'react';
import { useCurrentProjectContext, useProjectsContext } from '@/context';
import { IndividualProject } from './IndividualProject';
import styles from '@/styles/sidebar.module.scss';

export const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useCurrentProjectContext();
  const [projects] = useProjectsContext();

  return (
    <>
      {projects.map((item) => (
        <li
          key={item.id}
          className={`${styles.sidebar__project} ${currentProject === item.id ? styles.active : ''}`}
          role='button'
          tabIndex={0}
          onClick={() => setCurrentProject(item.id)}
          onKeyDown={(e) => e.key === 'Enter' && setCurrentProject(item.id)}
        >
          <IndividualProject project={item} />
        </li>
      ))}
    </>
  );
};
