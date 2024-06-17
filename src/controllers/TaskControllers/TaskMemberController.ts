import { defineComponent } from "vue";
import { Task } from "@/models/Task";
import axiosInstance from "@/axiosConfig";
import { User } from "@/models/User";
import { AxiosError } from "axios";

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
    };
  },
  computed: {
    sortedTasks() {
      return [...this.memberTasks].sort((a, b) => a.dueDate - b.dueDate);
    },
  },
  async mounted() {
    const teamId = this.$route.params.teamId;
    const memberId = this.$route.params.memberId;

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(`/users/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.member = response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(`/tasks/${teamId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.tasks = response.data;
      this.memberTasks = this.tasks.filter(
        (task: Task) => task.owner === memberId
      );
    } catch (error) {
      this.handleError(error as AxiosError);
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
    handleError(error: AxiosError<any>) {
      if (error.response && error.response.data) {
        this.error = error.response.data.message || "An error occurred";
      } else if (error.request) {
        this.error = "No response received from server";
      } else {
        this.error = error.message || "An error occurred";
      }
      this.snackbar = true;
    },
  },
});
