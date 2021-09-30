import React, { useEffect, useRef, useState } from 'react';
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai';
import { db, fetchTasks } from '@/utils/store';
import { useCurrentProjectContext, useTasksContext } from '@/context';
import styles from '@/styles/task.module.scss';
import type { ITask } from '@/type';

type TaskItemProps = {
  id: number;
  checked: boolean;
  children: string;
};

export const TaskItem: React.FC<TaskItemProps> = ({ id, children, checked }) => {
  const [tasks, setTasks] = useTasksContext();
  const [currentProject] = useCurrentProjectContext();

  async function updateTask(data: Partial<Pick<ITask, 'text' | 'archived'>>) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;
    await db.tasks.update(id, data);
    const newTasks = await fetchTasks(currentProject);
    setTasks(newTasks);
  }

  async function deleteTask() {
    if (!window.confirm('确定删除该任务？')) return;
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;
    await db.tasks.delete(id);
    const newTasks = await fetchTasks(currentProject);
    setTasks(newTasks);
  }

  const [disabled, setDisabled] = useState(true);
  const [text, setText] = useState(children);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    !disabled && inputRef.current?.focus();
  }, [disabled]);
  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!['Escape', 'Enter'].includes(e.key)) return;
    e.preventDefault();
    setDisabled(true);
    if (text === children) return;
    if (e.key === 'Escape') setText(children);
    else updateTask({ text });
  }

  return (
    <li className={styles.tasks__item}>
      <input onChange={(e) => updateTask({ archived: e.target.checked })} checked={checked} type='checkbox' />
      <input
        ref={inputRef}
        title={disabled ? '' : 'Enter确定，Esc取消'}
        type='text'
        value={text}
        disabled={disabled}
        onKeyDown={(e) => onInputKeyDown(e)}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.tasks__item__tools}>
        <button title={disabled ? '编辑' : '确定'} type='button' onClick={() => setDisabled(!disabled)}>
          <AiFillEdit />
        </button>
        <button title='删除任务' onClick={deleteTask}>
          <AiOutlineCloseCircle />
        </button>
      </div>
    </li>
  );
};
