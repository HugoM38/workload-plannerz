interface Task {
  _id: string;
  name: string;
  owner?: string;
  team: string;
  priority: number;
  dueDate: number;
}

export { Task };
