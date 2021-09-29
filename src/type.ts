import { DEFAULT_PROJECT } from './utils/const';

export type ProjectId = number | DEFAULT_PROJECT;
export interface IProject {
  id: ProjectId;
  name: string;
}
export interface ITask {
  id: number;
  projectId: ProjectId;
  text: string;
  date?: string;
  archived: boolean;
}
