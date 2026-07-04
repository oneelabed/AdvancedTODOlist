export type Task = {
  id: string;
  title: string;
  description: string;
  savedBy: string[];
  columnId: string;
  assigneeId: string;
};
