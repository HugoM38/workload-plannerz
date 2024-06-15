import { defineComponent } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import SearchList from "@/views/components/SearchList.vue";

export default defineComponent({
  name: "TeamCreation",
  components: {
    TeamForm,
    SearchList,
  },
  methods: {
    create_group() {
      console.log("Créer le groupe");
    },
  },
});
