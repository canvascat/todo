import React, { useState } from 'react';
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import { collatedTasks, DEFAULT_PROJECT } from '@/utils/const';
import { useSelectedProjectValue } from '@/context';
import { ProjectId } from '@/type';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';
import styles from '@/styles/sidebar.module.scss';
import { normalizeClassName } from '@/utils';

export const Sidebar: React.FC = () => {
  const { setSelectedProject, selectedProject } = useSelectedProjectValue();
  const icons = {
    [DEFAULT_PROJECT.INBOX]: <FaInbox />,
    [DEFAULT_PROJECT.TODAY]: <FaRegCalendar />,
    [DEFAULT_PROJECT.NEXT_7]: <FaRegCalendarAlt />,
  };

  function setCurrentProject(id: ProjectId) {
    setSelectedProject(id);
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        {collatedTasks.map((item) => (
          <li
            className={normalizeClassName(styles.sidebar__project, selectedProject === item.id && styles.active)}
            key={item.id}
            tabIndex={0}
            role='button'
            onClick={() => setCurrentProject(item.id)}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentProject(item.id)}
          >
            <span>{icons[item.id]}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <ul>
        <Projects />
      </ul>
      <AddProject />
    </div>
  );
};
