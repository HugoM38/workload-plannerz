import { defineComponent } from "vue";
import ListTeams from "@/views/HomePages/ListTeams.vue";
import { Team } from "@/models/Team";
import { getUserTeams } from "@/services/userService";

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
      this.listItems = await getUserTeams();
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }
  },
});
