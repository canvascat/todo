import React from 'react';
import { db } from '@/utils/store';
import { useTasksValue } from '@/context';

type TaskItemProps = {
  id: number;
  checked: boolean;
  children: string;
};

export const TaskItem: React.FC<TaskItemProps> = ({ id, children, checked }) => {
  const { tasks, setTasks } = useTasksValue();

  async function onCheckboxChange(archived: boolean) {
    const index = tasks.concat().findIndex((t) => t.id === id);
    console.log(tasks, id);
    if (index === -1) return;
    await db.tasks.update(id, { archived });
    tasks[index].archived = archived;
    console.log(tasks);
    setTasks([...tasks]);
  }

  return (
    <li>
      <input onChange={(e) => onCheckboxChange(e.target.checked)} checked={checked} type='checkbox' />
      <input type='text' value={children} disabled={true} />
    </li>
  );
};
