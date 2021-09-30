import React, { useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineUnorderedList } from 'react-icons/ai';
import { onClickOutside } from '@/utils/hooks';
import { useProjectsContext } from '@/context';
import type { ProjectId } from '@/type';

import styles from '@/styles/overlay.module.scss';
import taskStyles from '@/styles/task.module.scss';

type ProjectOverlayProps = {
  setProject: Function;
  projectId: ProjectId;
};

export const AddTaskToProject: React.FC<ProjectOverlayProps> = ({ setProject, projectId }) => {
  const [projects] = useProjectsContext();
  function modProject(id?: ProjectId) {
    setProject(id);
    setVisible(false);
  }

  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  onClickOutside(overlayRef, () => {
    setVisible(false);
  });
  return (
    <>
      {projects.length ? (
        <button
          className={taskStyles['add-task__project']}
          onClick={() => setVisible(!visible)}
          onKeyDown={(e) => e.key === 'Enter' && setVisible(!visible)}
        >
          <AiOutlineUnorderedList />
        </button>
      ) : null}
      {visible && (
        <div className={styles.overlay} ref={overlayRef}>
          <ul className={styles.overlay__list}>
            {projects.map((project) => (
              <li
                key={project.id}
                onClick={() => modProject(project.id)}
                onKeyDown={(e) => e.key === 'Enter' && modProject(project.id)}
                role='button'
                tabIndex={0}
              >
                <span>{project.name}</span>
                {project.id === projectId && <AiOutlineCheck />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
