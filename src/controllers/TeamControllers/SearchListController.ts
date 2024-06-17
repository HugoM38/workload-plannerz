import { defineComponent, ref, computed, PropType } from "vue";
import { User } from "@/models/User";
import axiosInstance from "@/axiosConfig";
import { Team } from "@/models/Team";
import { AxiosError } from "axios";

export default defineComponent({
  name: "SearchList",
  data() {
    return {
      team: {} as Team,
    };
  },
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
  setup(props, { emit }) {
    const searchQuery = ref("");
    const filteredTeamMembers = computed(() => {
      return props.teamMembers.filter((member) =>
        `${member.firstname.toLowerCase()} ${member.lastname.toLowerCase()}`.includes(
          searchQuery.value.toLowerCase()
        )
      );
    });

    const filteredNonMembers = computed(() => {
      return props.nonMembers.filter((nonMember) =>
        `${nonMember.firstname.toLowerCase()} ${nonMember.lastname.toLowerCase()}`.includes(
          searchQuery.value.toLowerCase()
        )
      );
    });

    return {
      searchQuery,
      filteredTeamMembers,
      filteredNonMembers,
    };
  },
  methods: {
    async addMember(nonMember: User) {
      try {
        const token: string = localStorage.getItem("token") || "";
        await axiosInstance.post(
          `/teams/${this.team._id}/addMember`,
          {
            userId: nonMember._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Emit events to update the lists
        this.$emit("update:teamMembers", [...this.teamMembers, nonMember]);
        this.$emit(
          "update:nonMembers",
          this.nonMembers.filter((member) => member._id !== nonMember._id)
        );
      } catch (error) {
        console.error(error);
      }
    },

    async removeMember(member: User) {
      try {
        const token: string = localStorage.getItem("token") || "";
        await axiosInstance.post(
          `/teams/${this.team._id}/removeMember`,
          {
            userId: member._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Emit events to update the lists
        this.$emit("update:nonMembers", [...this.nonMembers, member]);
        this.$emit(
          "update:teamMembers",
          this.teamMembers.filter((teamMember) => teamMember._id !== member._id)
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});
