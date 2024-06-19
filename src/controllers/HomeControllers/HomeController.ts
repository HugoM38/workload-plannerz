import { defineComponent } from "vue";
import ListTeams from "@/views/HomePages/ListTeams.vue";
import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";

export default defineComponent({
  name: "HomePage",
  components: {
    ListTeams,
  },
  data() {
    return {
      listItems: [] as Team[],
      snackbar: false,
      error: "",
    };
  },
  async mounted() {
    try {
      const token: string = localStorage.getItem("token") || "";
      const response = await axiosInstance.get("/users/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.listItems = response.data;
    } catch (error) {
      this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
      this.snackbar = true;
    }
  },
});
