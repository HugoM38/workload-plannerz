<template>
  <v-app>
    <v-main>
      <h1>Éditer le groupe {{ id }}</h1>
      <v-container>
        <TeamForm />
        <SearchList />
        <v-btn color="primary" @click="edit_group">Modifier</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TeamForm from "../components/TeamForm.vue";
import SearchList from "../components/SearchList.vue";

export default defineComponent({
  name: "TeamEdit",
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
    TeamForm,
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
