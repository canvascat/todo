import React, { useRef, useState } from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { onClickOutside } from '@/utils/hooks';

import styles from '@/styles/overlay.module.scss';
import taskStyles from '@/styles/task.module.scss';

type TaskDateProps = {
  setTaskDate: Function;
};

export const AddTaskDate: React.FC<TaskDateProps> = ({ setTaskDate }) => {
  const list = [
    { id: 'TODAY', label: '今天', icon: <FaSpaceShuttle /> },
    { id: 'TOMORROW', label: '明天', icon: <FaSun /> },
    { id: 'NEXT_WEEK', label: '下周', icon: <FaRegPaperPlane /> },
  ];
  function onClickDateItem(id: string) {
    switch (id) {
      case 'TODAY':
        setVisible(false);
        setTaskDate(moment().format('DD/MM/YYYY'));
        break;
      case 'TOMORROW':
        setVisible(false);
        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
        break;
      case 'NEXT_WEEK':
        setVisible(false);
        setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
        break;
      default:
        break;
    }
  }
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  onClickOutside(overlayRef, () => {
    setVisible(false);
  });
  return (
    <>
      <button
        className={taskStyles['add-task__date']}
        onClick={() => setVisible(!visible)}
        onKeyDown={(e) => e.key === 'Enter' && setVisible(!visible)}
      >
        <AiOutlineCalendar />
      </button>
      {visible && (
        <div className={styles.overlay} ref={overlayRef}>
          <ul className={styles.overlay__list}>
            {list.map((item) => (
              <li
                key={item.id}
                onClick={() => onClickDateItem(item.id)}
                onKeyDown={(e) => e.key === 'Enter' && onClickDateItem(item.id)}
                tabIndex={0}
                role='button'
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
