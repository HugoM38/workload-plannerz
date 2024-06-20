import { Task } from "./Task";
import { User } from "./User";

interface TeamDetails {
  owner: User;
  members: User[];
  tasks: Task[];
  workload: number;
}

export default TeamDetails;
