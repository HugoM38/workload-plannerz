<template>
  <v-app>
    <v-main>
      <v-container>
        <TeamForm />
        <SearchList />
        <v-btn color="primary" @click="create_group">Créer</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TeamForm from "../components/TeamForm.vue";
import SearchList from "../components/SearchList.vue";

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
</script>

<style scoped></style>
