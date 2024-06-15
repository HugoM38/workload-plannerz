import { defineComponent } from "vue";
import ListItem from "@/views/components/ListItemTeams.vue";

export default defineComponent({
  name: "ListTeams",
  components: {
    ListItem,
  },
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
  },
});
