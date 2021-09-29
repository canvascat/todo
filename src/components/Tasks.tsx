import React, { useEffect, useMemo, useState } from 'react';
import { AddTask } from './AddTask';
import { TaskItem } from './TaskItem';
import { useSelectedProjectValue, useProjectsValue, useTasksValue } from '@/context';
import { ITask } from '@/type';
import { collatedTasks } from '@/utils/const';

import styles from '@/styles/task.module.scss';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasksValue();
  const [undoneTasks, doneTasks] = useMemo(
    () => tasks.reduce<[ITask[], ITask[]]>((ts, t) => (ts[+t.archived].push(t), ts), [[], []]),
    [tasks]
  );
  const projectName = useMemo(
    () =>
      (typeof selectedProject === 'number' ? projects : collatedTasks).find((p) => p.id === selectedProject)?.name ??
      '任务',
    [selectedProject, projects]
  );

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className={styles.tasks}>
      <h2>{projectName}</h2>
      <ul className={styles.tasks__list} key='undone'>
        {undoneTasks.map((task) => (
          <TaskItem key={task.id} id={task.id} checked={task.archived}>
            {task.text}
          </TaskItem>
        ))}
      </ul>
      {doneTasks.length > 0 && (
        <details>
          <summary>已完成</summary>
          <ul className={styles.tasks__list} key='done'>
            {doneTasks.map((task) => (
              <TaskItem key={task.id} id={task.id} checked={task.archived}>
                {task.text}
              </TaskItem>
            ))}
          </ul>
        </details>
      )}
      <AddTask />
    </div>
  );
};
