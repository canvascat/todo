import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';
import { useCurrentProjectContext, useTasksContext } from '@/context';
import { db, fetchTasks } from '@/utils/store';
import { DEFAULT_PROJECT } from '@/utils/const';
import { AddTaskToProject } from './AddTaskToProject';
import { AddTaskDate } from './AddTaskDate';
import type { ITask } from '@/type';

import styles from '@/styles/task.module.scss';

type AddTaskProps = {
  showQuickAddTask?: boolean;
  setShowQuickAddTask?: Function;
};

export const AddTask: React.FC<AddTaskProps> = ({ showQuickAddTask, setShowQuickAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const [currentProject, setCurrentProject] = useCurrentProjectContext();
  const [, setTasks] = useTasksContext();

  async function addTask() {
    const projectId = currentProject;
    const collatedDate =
      projectId === DEFAULT_PROJECT.TODAY
        ? moment().format('DD/MM/YYYY')
        : projectId === DEFAULT_PROJECT.NEXT_7
        ? moment().add(7, 'days').format('DD/MM/YYYY')
        : '';
    await db.tasks.add({
      archived: false,
      projectId,
      text: taskText,
      date: collatedDate || taskDate,
    } as ITask);
    const newTasks = await fetchTasks(currentProject);
    setTasks(newTasks);
    setTaskText('');
  }

  async function submitTask() {
    if (!taskText) return;
    await addTask();
    showQuickAddTask && setShowQuickAddTask?.(false);
  }

  function onInputKeyUp(key: string) {
    switch (key) {
      case 'Enter':
        submitTask();
        break;
      case 'Escape':
        break;
      default:
        break;
    }
  }

  return (
    <div className={`${styles[showQuickAddTask ? 'add-task__overlay' : 'add-task__default']}`}>
      <div className={styles['add-task__main']}>
        {showQuickAddTask && (
          <div className={styles['add-task__header']}>
            <h2>添加任务弹窗</h2>
            <span
              className={styles['add-task__cancel-x']}
              aria-label='取消添加任务'
              onClick={() => {
                setShowQuickAddTask?.(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowQuickAddTask?.(false);
                }
              }}
              tabIndex={0}
              role='button'
            >
              <AiOutlineClose />
            </span>
          </div>
        )}
        <div className={styles['add-task__content-wrap']}>
          <input
            className={styles['add-task__content']}
            type='text'
            title='Enter确定，Esc取消'
            placeholder='📝 添加任务'
            value={taskText}
            onKeyUp={(e) => onInputKeyUp(e.key)}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <div className={styles['add-task__tools']}>
            <AddTaskToProject setProject={setCurrentProject} projectId={currentProject} />
            <AddTaskDate setTaskDate={setTaskDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
