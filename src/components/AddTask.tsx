import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';
import { useSelectedProjectValue } from '@/context';
import { db } from '@/utils/store';
import { DEFAULT_PROJECT } from '@/utils/const';
import { ITask } from '@/type';
import { AddTaskToProject } from './AddTaskToProject';
import { AddTaskDate } from './AddTaskDate';

import styles from '@/styles/task.module.scss';

type AddTaskProps = {
  showQuickAddTask?: boolean;
  setShowQuickAddTask?: Function;
};

export const AddTask: React.FC<AddTaskProps> = ({ showQuickAddTask, setShowQuickAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  const addTask = () => {
    if (!taskText) return;
    const projectId = selectedProject;
    const collatedDate =
      projectId === DEFAULT_PROJECT.TODAY
        ? moment().format('DD/MM/YYYY')
        : projectId === DEFAULT_PROJECT.NEXT_7
        ? moment().add(7, 'days').format('DD/MM/YYYY')
        : '';
    db.tasks.add({
      archived: false,
      projectId,
      text: taskText,
      date: collatedDate || taskDate,
    } as ITask);
    setTaskText('');
    return true;
  };

  function submitTask() {
    showQuickAddTask ? addTask() && setShowQuickAddTask?.(false) : addTask();
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
            <AddTaskToProject setProject={setSelectedProject} projectId={selectedProject} />
            <AddTaskDate setTaskDate={setTaskDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
