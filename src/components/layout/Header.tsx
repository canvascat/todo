import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSun, BiMoon } from 'react-icons/bi';
import { AddTask } from '../AddTask';

import styles from '@/styles/header.module.scss';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: Function;
};

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.logo}>TodoList</div>
        <div className={styles.settings}>
          <button
            type='button'
            onClick={() => {
              setShowQuickAddTask(true);
            }}
          >
            <AiOutlinePlus />
          </button>
          <button type='button' onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <BiMoon /> : <BiSun />}
          </button>
        </div>
      </nav>
      {showQuickAddTask && <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />}
    </header>
  );
};
