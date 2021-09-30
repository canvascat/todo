import React from 'react';
import { BsTrash, BsDot } from 'react-icons/bs';
import { useProjectsContext, useCurrentProjectContext } from '@/context';
import { db } from '@/utils/store';
import { DEFAULT_PROJECT } from '@/utils/const';
import type { IProject, ProjectId } from '@/type';

import styles from '@/styles/sidebar.module.scss';

type IndividualProjectProp = {
  project: IProject;
};

export const IndividualProject: React.FC<IndividualProjectProp> = ({ project }) => {
  const [projects, setProjects] = useProjectsContext();
  const [currentProject, setCurrentProject] = useCurrentProjectContext();

  const deleteProject = async (id?: ProjectId) => {
    if (typeof id !== 'number') return;
    await db.projects.delete(id);
    setProjects([...projects]);
    id === currentProject && setCurrentProject(DEFAULT_PROJECT.INBOX);
  };

  function showDeleteProjectConfirm() {
    if (!window.confirm('确定删除？')) return;
    deleteProject(project.id);
  }

  return (
    <>
      <span className={styles.sidebar__dot}>
        <BsDot />
      </span>
      <span className={styles['sidebar__project-name']}>{project.name}</span>
      <span
        className={styles['sidebar__project-delete']}
        onClick={showDeleteProjectConfirm}
        onKeyDown={(e) => e.key === 'Enter' && showDeleteProjectConfirm()}
        tabIndex={0}
        role='button'
        aria-label='确定删除该清单？'
      >
        <BsTrash />
      </span>
    </>
  );
};
