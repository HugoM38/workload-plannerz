import { defineComponent, onMounted, ref } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import SearchList from "@/views/components/SearchList.vue";

export default defineComponent({
  name: "TeamEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const groupName = ref("");

    onMounted(() => {
      console.log(`Éditer le groupe avec l'ID: ${props.id}`);
      groupName.value = `Nom du groupe ${props.id}`;
    });

    const saveGroup = () => {
      console.log(`Enregistrer le groupe: ${groupName.value}`);
    };

    return {
      groupName,
      saveGroup,
    };
  },
  components: {
    TeamForm,
    SearchList,
  },
  methods: {
    edit_group() {
      console.log("Modifier le groupe");
    },
  },
});
