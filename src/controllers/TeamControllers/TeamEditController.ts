import { defineComponent } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import SearchList from "@/views/components/SearchList.vue";
import { User } from "@/models/User";
import { Team } from "@/models/Team";
import {
  getTeamMembers,
  getNonMembers,
  updateTeamName,
} from "@/services/teamService";

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
      this.teamMembers = await getTeamMembers(this.team._id);
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }

    try {
      this.nonMembers = await getNonMembers(this.team._id);
    } catch (error) {
      this.error = error as string;
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
      try {
        await updateTeamName(this.team._id, this.team.name);
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
