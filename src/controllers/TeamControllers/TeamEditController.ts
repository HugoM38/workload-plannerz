import { defineComponent } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import SearchList from "@/views/components/SearchList.vue";
import { User } from "@/models/User";
import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";

export default defineComponent({
  name: "TeamEdit",
  data() {
    return {
      team: {} as Team,
      teamMembers: [] as User[],
      nonMembers: [] as User[],
      error: "",
      snackbar: false,
    };
  },
  components: {
    TeamForm,
    SearchList,
  },
  props: {
    teamData: {
      type: String,
      required: true,
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
      const response = await axiosInstance.get(
        `/teams/${this.team._id}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.teamMembers = response.data;
    } catch (error) {
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
      this.snackbar = true;
    }

    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get(
        `/teams/${this.team._id}/nonMembers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.nonMembers = response.data;
    } catch (error) {
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
      this.snackbar = true;
    }
  },
  methods: {
    updateGroupName(newName: string) {
      this.team.name = newName;
    },
    updateTeamMembers(members: User[]) {
      this.teamMembers = members;
    },
    updateNonMembers(members: User[]) {
      this.nonMembers = members;
    },
    async editGroup() {
      console.log(`Modifier le groupe: ${this.team.name}`);
      try {
        const token: string = localStorage.getItem("token") || "";
        await axiosInstance.patch(
          `/teams/${this.team._id}/changeName`,
          { name: this.team.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      }
    },
  },
});
