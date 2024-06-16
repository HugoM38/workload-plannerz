import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { Task } from "@/models/Task";
import { AxiosError } from "axios";
import { defineComponent } from "vue";

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
      error: "",
      snackbar: false,
    };
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
      const errorResponse = error as AxiosError<any>;
      if (errorResponse.response && errorResponse.response.data) {
        this.error = errorResponse.response.data.message || "An error occurred";
      } else if (errorResponse.request) {
        this.error = "No response received from server";
      } else {
        this.error = errorResponse.message || "An error occurred";
      }
      this.snackbar = true;
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
      const errorResponse = error as AxiosError<any>;
      if (errorResponse.response && errorResponse.response.data) {
        this.error = errorResponse.response.data.message || "An error occurred";
      } else if (errorResponse.request) {
        this.error = "No response received from server";
      } else {
        this.error = errorResponse.message || "An error occurred";
      }
      this.snackbar = true;
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
      const errorResponse = error as AxiosError<any>;
      if (errorResponse.response && errorResponse.response.data) {
        this.error = errorResponse.response.data.message || "An error occurred";
      } else if (errorResponse.request) {
        this.error = "No response received from server";
      } else {
        this.error = errorResponse.message || "An error occurred";
      }
      this.snackbar = true;
    }
  },
  methods: {
    viewTasks(memberId: string) {
      console.log(memberId);
    },
    getOwnerName(ownerId: string) {
      const owner = this.members.find((member) => member._id === ownerId);
      return owner ? `${owner.firstname} ${owner.lastname}` : "Inconnu";
    },
    formatDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toLocaleDateString("fr-FR");
    },
  },
});
