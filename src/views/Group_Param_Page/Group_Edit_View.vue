<template>
  <v-app>
    <v-main>
      <h1>Éditer le groupe {{ id }}</h1>
      <v-container>
        <GroupForm />
        <SearchList />
        <v-btn color="primary" @click="edit_group">Modifier</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GroupForm from "../components/Group_Form.vue";
import SearchList from "../components/Search_List.vue";

export default defineComponent({
  name: "GroupeEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
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
    GroupForm,
    SearchList,
  },
  methods: {
    edit_group() {
      console.log("Modifier le groupe");
    },
  },
});
</script>

<style scoped></style>
