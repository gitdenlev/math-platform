export interface ITask {
  id: string;
  title: string;
  description: string;
  types: string[];
  variables?: { [key: string]: string | number };
  correctAnswer?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  hint?: string;
  status?: TaskTypes;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TaskTypes {
  ACTIVE = "active",
  COMPLETED = "completed",
  SKIPPED = "skipped",
}
