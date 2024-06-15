import { defineComponent } from "vue";
import { Team } from "@/models/Team";

export default defineComponent({
  name: "ListItemTeams",
  props: {
    team: {
      type: Object as () => Team,
      required: true,
    },
  },
  methods: {
    viewGroup() {
      const teamData = btoa(encodeURIComponent(JSON.stringify(this.team)));
      this.$router.push(`/team/${teamData}`);
    },
  },
});
