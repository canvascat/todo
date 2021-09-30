import React, { useState, useEffect } from 'react';
import { IProject, ITask, ProjectId } from '@/type';
import { db, fetchTasks } from './store';

export const useTasks = (selectedProject: ProjectId) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    fetchTasks(selectedProject).then(setTasks);
  }, [selectedProject]);

  return { tasks, setTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([] as IProject[]);

  useEffect(() => {
    db.projects
      .orderBy('id')
      .toArray()
      .then((allProjects) => {
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};

export const useDebounce = <T = any>(value: T, delay?: number) => {
  const [dv, setDV] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDV(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return dv;
};

export const onClickOutside = (elRef: React.RefObject<Element>, handler: (evt?: PointerEvent) => unknown) => {
  const listener = (evt: PointerEvent) => {
    const el = elRef.current;
    const { target } = evt;
    el?.contains(target as Node);
    if (!target || !el || target === el || evt.composedPath().includes(el)) return;
    handler(evt);
  };
  useEffect(() => {
    window.addEventListener('pointerdown', listener, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', listener);
    };
  }, []);
};

export const useCssVar = (prop: string, defaultValue?: string): [string, (value: string) => void] => {
  const root = window.document.documentElement;
  defaultValue ??= window.getComputedStyle(root).getPropertyValue(prop);
  const [value, _setValue] = useState(defaultValue);
  return [value, (v: string) => (root.style.setProperty(prop, v), _setValue(v))];
};
