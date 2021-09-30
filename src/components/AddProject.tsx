import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useProjectsContext } from '@/context';
import { db } from '@/utils/store';
import type { IProject } from '@/type';

import styles from '@/styles/project.module.scss';

type AddProjectProps = {
  shouldShow?: boolean;
};

export const AddProject: React.FC<AddProjectProps> = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useProjectsContext();
  useEffect(() => {
    if (show) {
      setProjectName('新建清单');
      inputRef.current?.focus();
    }
  }, [show]);

  const addProject = async () => {
    if (!projectName) return alert('请输入清单名称');
    await db.projects.add({ name: projectName } as IProject);
    setProjects([...projects]);
    setProjectName('');
    setShow(false);
  };

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'Escape':
        setShow(false);
        break;
      case 'Enter':
        addProject();
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles['add-project']}>
      <span className={styles['add-project__plus']}>
        <AiOutlinePlus />
      </span>
      {show ? (
        <input
          className={styles['add-project__input']}
          ref={inputRef}
          title='Enter确定，Esc取消'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          // onBlur={addProject}
          type='text'
          placeholder='请输入清单名称'
          onKeyDown={onInputKeyDown}
        />
      ) : (
        <span
          aria-label='新建清单'
          className={styles['add-project__text']}
          onClick={() => setShow(!show)}
          onKeyDown={(e) => e.key === 'Enter' && setShow(!show)}
          role='button'
          tabIndex={0}
        >
          新建清单
        </span>
      )}
    </div>
  );
};
