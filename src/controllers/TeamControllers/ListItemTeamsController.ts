import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItemTeams",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    viewGroup() {
      // Implémente la logique pour voir le groupe
      console.log(`Voir le groupe: ${this.text}`);
    },
  },
});
