import React from 'react';
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import { collatedTasks, DEFAULT_PROJECT } from '@/utils/const';
import { useCurrentProjectContext } from '@/context';
import { normalizeClassName } from '@/utils';
import { Projects } from '@/components/Projects';
import { AddProject } from '@/components/AddProject';
import styles from '@/styles/sidebar.module.scss';

export const Sidebar: React.FC = () => {
  const [currentProject, setCurrentProject] = useCurrentProjectContext();
  const icons = {
    [DEFAULT_PROJECT.INBOX]: <FaInbox />,
    [DEFAULT_PROJECT.TODAY]: <FaRegCalendar />,
    [DEFAULT_PROJECT.NEXT_7]: <FaRegCalendarAlt />,
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        {collatedTasks.map((item) => (
          <li
            className={normalizeClassName(styles.sidebar__project, currentProject === item.id && styles.active)}
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
