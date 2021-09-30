import { Dexie } from 'dexie';
import moment from 'moment';
import { DEFAULT_PROJECT } from '@/utils/const';
import type { IProject, ITask, ProjectId } from '@/type';

class TodoDB extends Dexie {
  tasks: Dexie.Table<ITask, number>;
  projects: Dexie.Table<IProject, number>;

  constructor() {
    super('TODO_LIST');
    this.version(1).stores({
      tasks: '++id,projectId,text,date,archived',
      projects: '++id,name',
    });
    this.tasks = this.table('tasks');
    this.projects = this.table('projects');
  }
}

export const db = new TodoDB();

export const fetchTasks = (projectId?: ProjectId) => {
  const unsubscribe =
    typeof projectId === 'number'
      ? db.tasks.where('projectId').equals(projectId)
      : projectId === DEFAULT_PROJECT.INBOX
      ? db.tasks.filter((t) => t.date === '')
      : projectId === DEFAULT_PROJECT.TODAY
      ? db.tasks.where('date').equals(moment().format('DD/MM/YYYY'))
      : projectId === DEFAULT_PROJECT.NEXT_7
      ? db.tasks.filter((t) => moment(t.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7)
      : db.tasks;
  return unsubscribe.toArray();
};
