import { Dexie } from 'dexie';
import { IProject, ITask } from '../type';

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
