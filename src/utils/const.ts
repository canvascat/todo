// import { IProject } from '../type';

export const enum DEFAULT_PROJECT {
  INBOX = 'INBOX',
  TODAY = 'TODAY',
  NEXT_7 = 'NEXT_7',
}

export const collatedTasks = [
  { id: DEFAULT_PROJECT.INBOX, name: '普通' },
  { id: DEFAULT_PROJECT.TODAY, name: '今天' },
  { id: DEFAULT_PROJECT.NEXT_7, name: '下周' },
];
