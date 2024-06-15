import { defineComponent } from "vue";
import ListTeams from "@/views/HomePages/ListTeams.vue";
import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { AxiosError } from "axios";

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
});
