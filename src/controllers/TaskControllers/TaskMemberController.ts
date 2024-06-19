import { defineComponent } from "vue";
import { Task } from "@/models/Task";
import axiosInstance from "@/axiosConfig";
import { User } from "@/models/User";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";

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
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
      this.snackbar = true;
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
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
      this.snackbar = true;
    }

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(
        `/teams/${teamId}/${memberId}/workload`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      this.memberWorkload = response.data.workload;
    } catch (error) {
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
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
        const token: string = localStorage.getItem("token") || "";
        await axiosInstance.patch(
          `/tasks/${taskId}/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.tasks = this.tasks.map((task) => {
          if (task._id === taskId) {
            task.state = "Validée";
          }
          return task;
        });
      } catch (error) {
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      }
    },
  },
});
