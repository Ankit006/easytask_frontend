import { IProject } from "@/model";

export interface IProjectListItem extends IProject {
  workDone: number; // This value represent total work done in the project in percentage
}
