import { defineComponent } from "vue";
import { Task } from "@/models/Task";
import { User } from "@/models/User";
import { getUserDetails } from "@/services/userService";
import {
  getTasksByTeam,
  validateTask,
  deleteTask,
} from "@/services/taskService";
import { getMemberWorkload } from "@/services/teamService";

export default defineComponent({
  name: "TaskMemberPage",
  data() {
    return {
      member: {} as User,
      tasks: [] as Task[],
      memberTasks: [] as Task[],
      selectedTask: null as Task | null,
      taskDialog: false,
      error: "",
      snackbar: false,
      sortOption: "dueDate",
      hideCompleted: false,
      memberWorkload: 0,
    };
  },
  computed: {
    sortedTasks() {
      let tasks = [...this.memberTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
  },
  async mounted() {
    const teamId: string = this.$route.params.teamId as string;
    const memberId: string = this.$route.params.memberId as string;

    try {
      this.member = await getUserDetails(memberId);
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }

    try {
      this.tasks = await getTasksByTeam(teamId);
      this.memberTasks = this.tasks.filter(
        (task: Task) => task.owner === memberId
      );
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }

    try {
      this.memberWorkload = await getMemberWorkload(teamId, memberId);
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }
  },
  methods: {
    formatDate(timestamp?: number) {
      if (!timestamp) return "Non définie";
      const date = new Date(timestamp);
      return date.toLocaleDateString("fr-FR");
    },
    openTaskDialog(task: Task) {
      this.selectedTask = task;
      this.taskDialog = true;
    },
    navigateToUpdateTask(taskId: string) {
      const path = `/team/${this.$route.params.teamId}/task/update/${taskId}`;
      this.$router.push(path);
    },
    async closeTask(taskId: string) {
      this.taskDialog = false;
      try {
        await validateTask(taskId);
        this.tasks = this.tasks.map((task) => {
          if (task._id === taskId) {
            task.state = "Validée";
          }
          return task;
        });
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
    async deleteTask(taskId: string) {
      this.taskDialog = false;
      try {
        await deleteTask(taskId);
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
        this.memberTasks = this.memberTasks.filter(
          (task) => task._id !== taskId
        );
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
