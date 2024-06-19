import { defineComponent } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import axiosInstance from "@/axiosConfig";
import router from "@/router";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";

export default defineComponent({
  name: "TeamCreation",
  components: {
    TeamForm,
  },
  data() {
    return {
      teamName: "",
      error: "",
      snackbar: false,
    };
  },
  methods: {
    async createTeam() {
      const logged_user = JSON.parse(localStorage.getItem("user") || "{}");
      const token: string = localStorage.getItem("token") || "";
      try {
        const form = {
          name: this.teamName,
          owner: logged_user._id,
        };
        console.log("Créer le groupe", form);
        await axiosInstance.post("teams/create", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/");
      } catch (err) {
        this.error = handleAxiosError(err as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
        console.error("Team creation error:", this.error);
      }
    },
  },
});
