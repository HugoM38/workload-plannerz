import { Team } from "@/models/Team";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeamDetailsPage",
  data() {
    return {
      team: {} as Team,
    };
  },
  mounted() {
    const teamData = this.$route.params.teamData;
    try {
      const decodedData = Array.isArray(teamData)
        ? ""
        : decodeURIComponent(atob(teamData));
      this.team = JSON.parse(decodedData);
    } catch (error) {
      console.error("Erreur lors du décodage des données de l'équipe", error);
    }
  },
});
