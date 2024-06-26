import { defineComponent } from "vue";
import ListItem from "@/views/CustomsComponents/ListItemTeams.vue";
import { Team } from "@/models/Team";

export default defineComponent({
  name: "ListTeams",
  components: {
    ListItem,
  },
  props: {
    teams: {
      type: Array as () => Team[],
      required: true,
    },
  },
});
