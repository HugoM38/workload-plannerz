import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { AxiosError } from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeamDetailsPage",
  data() {
    return {
      team: {} as Team,
      members: [] as User[],
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
  },
  methods: {
    viewTasks(memberId: string) {
      console.log(memberId);
    },
  },
});
