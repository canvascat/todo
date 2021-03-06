import React, { useEffect, useMemo } from 'react';
import { useCurrentProjectContext, useProjectsContext, useTasksContext } from '@/context';
import { collatedTasks } from '@/utils/const';
import type { ITask } from '@/type';
import { AddTask } from './AddTask';
import { TaskItem } from './TaskItem';

import styles from '@/styles/task.module.scss';

export const Tasks: React.FC = () => {
  const [currentProject] = useCurrentProjectContext();
  const [projects] = useProjectsContext();
  const [tasks] = useTasksContext();
  const [undoneTasks, doneTasks] = useMemo(
    () => tasks.reduce<[ITask[], ITask[]]>((ts, t) => (ts[+t.archived].push(t), ts), [[], []]),
    [tasks]
  );

  const projectName = useMemo(
    () =>
      (typeof currentProject === 'number' ? projects : collatedTasks).find((p) => p.id === currentProject)?.name ??
      '任务',
    [currentProject, projects]
  );

  useEffect(() => {
    document.title = `${projectName}: Todos`;
  }, [projectName]);

  return (
    <div className={styles.tasks}>
      <h2>{projectName}</h2>
      <ul key='undone'>
        {undoneTasks.map((task) => (
          <TaskItem key={task.id} id={task.id} checked={task.archived}>
            {task.text}
          </TaskItem>
        ))}
      </ul>
      {doneTasks.length > 0 && (
        <details>
          <summary>已完成（{doneTasks.length}）</summary>
          <ul key='done'>
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
