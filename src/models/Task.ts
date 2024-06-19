interface Task {
  _id: string;
  name: string;
  owner?: string;
  team: string;
  priority: number;
  state: string;
  dueDate: number;
  creationDate: number;
  timeEstimation: number;
}

export { Task };
