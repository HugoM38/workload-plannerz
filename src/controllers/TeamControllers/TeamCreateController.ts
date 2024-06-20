import { defineComponent } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import router from "@/router";
import { createTeam } from "@/services/teamService";

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
      try {
        await createTeam(this.teamName, logged_user._id);
        router.push("/");
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
