import { defineComponent } from "vue";
import ListTeams from "@/views/HomePages/ListTeams.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    ListTeams,
  },
  data() {
    return {
      listItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },
});
