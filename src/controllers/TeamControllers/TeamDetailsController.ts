import { defineComponent } from "vue";
import { Task } from "@/models/Task";
import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { AxiosError } from "axios";

export default defineComponent({
  name: "TeamDetailsPage",
  data() {
    return {
      team: {} as Team,
      members: [] as User[],
      owner: {} as User,
      tasks: [] as Task[],
      userTasks: [] as Task[],
      unownedTasks: [] as Task[],
      ownedTasks: [] as Task[],
      selectedTask: null as Task | null,
      taskDialog: false,
      error: "",
      snackbar: false,
      sortOption: "dueDate", // Default sorting option
      hideCompleted: false, // Hide completed tasks option
    };
  },
  computed: {
    sortedUserTasks() {
      let tasks = [...this.userTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
    sortedUnownedTasks() {
      let tasks = [...this.unownedTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
    sortedOwnedTasks() {
      let tasks = [...this.ownedTasks];
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
    const teamData = this.$route.params.teamData;
    try {
      const decodedData = Array.isArray(teamData)
        ? ""
        : decodeURIComponent(atob(teamData));
      this.team = JSON.parse(decodedData);
    } catch (error) {
      console.error("Erreur lors du décodage des données de l'équipe", error);
    }

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(`/users/${this.team.owner}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.owner = response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(
        `/teams/${this.team._id}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.members = response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }

    try {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      const userId = user._id;
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(`/tasks/${this.team._id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.tasks = response.data;
      this.userTasks = this.tasks.filter((task: Task) => task.owner === userId);
      this.unownedTasks = this.tasks.filter(
        (task: Task) => task.owner === undefined
      );
      this.ownedTasks = this.tasks.filter(
        (task: Task) => task.owner && task.owner !== userId
      );
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  },
  methods: {
    viewTasks(memberId: string) {
      const path = `/team/${this.team._id}/${memberId}`;
      this.$router.push(path);
    },
    getOwnerName(ownerId: string) {
      const owner = this.members.find((member) => member._id === ownerId);
      return owner ? `${owner.firstname} ${owner.lastname}` : "Inconnu";
    },
    formatDate(timestamp?: number) {
      if (!timestamp) return "Non définie";
      const date = new Date(timestamp);
      return date.toLocaleDateString("fr-FR");
    },
    navigateToCreateTask() {
      const path = `/team/${this.team._id}/task/create`;
      this.$router.push(path);
    },
    navigateToEditTeam() {
      const teamData = btoa(encodeURIComponent(JSON.stringify(this.team)));
      const path = `/team/${teamData}/edit`;
    },
    navigateToUpdateTask(taskId: string) {
      const path = `/team/${this.team._id}/task/update/${taskId}`;
      this.$router.push(path);
    },
    openTaskDialog(task: Task) {
      this.selectedTask = task;
      this.taskDialog = true;
    },
    isOwner() {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      return this.team.owner === user._id;
    },
    async closeTask(taskId: string) {
      this.taskDialog = false;
      try {
        const token: string = localStorage.getItem("token") || "";
        const response = await axiosInstance.patch(
          `/tasks/${taskId}/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        this.tasks = this.tasks.map((task) => {
          if (task._id === taskId) {
            task.state = "Validée";
          }
          return task;
        });
      } catch (error) {
        this.handleError(error as AxiosError);
      }
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
