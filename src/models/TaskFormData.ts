interface TaskFormData {
  name: string;
  priority: string | number;
  dueDate: number;
  team: string | string[];
  owner?: string | null;
  timeEstimation: number;
}

export { TaskFormData };
