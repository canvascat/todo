import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { IProject, ITask, ProjectId } from '@/type';
import { db } from './store';
import { DEFAULT_PROJECT } from './const';

export const useTasks = (selectedProject: ProjectId) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const unsubscribe =
      typeof selectedProject === 'number'
        ? db.tasks.where('projectId').equals(selectedProject)
        : selectedProject === DEFAULT_PROJECT.INBOX
        ? db.tasks.filter((t) => t.date === '')
        : selectedProject === DEFAULT_PROJECT.TODAY
        ? db.tasks.where('date').equals(moment().format('DD/MM/YYYY'))
        : selectedProject === DEFAULT_PROJECT.NEXT_7
        ? db.tasks.filter((t) => moment(t.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7)
        : db.tasks;

    unsubscribe.toArray().then((newTasks) => {
      setTasks(newTasks);
    });
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
