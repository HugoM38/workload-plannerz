import { defineComponent, PropType } from "vue";
import { User } from "@/models/User";
import { Team } from "@/models/Team";
import { addMember, removeMember } from "@/services/teamService";

export default defineComponent({
  name: "SearchList",
  props: {
    teamMembers: {
      type: Array as PropType<User[]>,
      required: true,
    },
    nonMembers: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  data() {
    return {
      team: {} as Team,
      searchQuery: "",
      error: "",
      snackbar: false,
    };
  },
  computed: {
    filteredTeamMembers() {
      return this.teamMembers.filter((member) =>
        `${member.firstname.toLowerCase()} ${member.lastname.toLowerCase()}`.includes(
          this.searchQuery.toLowerCase()
        )
      );
    },
    filteredNonMembers() {
      return this.nonMembers.filter((nonMember) =>
        `${nonMember.firstname.toLowerCase()} ${nonMember.lastname.toLowerCase()}`.includes(
          this.searchQuery.toLowerCase()
        )
      );
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
  },
  methods: {
    async addMember(nonMember: User) {
      try {
        await addMember(this.team._id, nonMember._id);
        this.$emit("update:teamMembers", [...this.teamMembers, nonMember]);
        this.$emit(
          "update:nonMembers",
          this.nonMembers.filter((member) => member._id !== nonMember._id)
        );
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
    async removeMember(member: User) {
      try {
        await removeMember(this.team._id, member._id);
        this.$emit("update:nonMembers", [...this.nonMembers, member]);
        this.$emit(
          "update:teamMembers",
          this.teamMembers.filter((teamMember) => teamMember._id !== member._id)
        );
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
