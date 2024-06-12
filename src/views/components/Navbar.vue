<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Mon App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn color="primary" @click="create">Créer un groupe</v-btn>
    <v-btn color="primary" @click="logout">Déconnexion</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Plannerz_Navbar",
  methods: {
    toggleDrawer() {
      // Implémente la logique pour afficher/cacher le drawer (menu latéral) si nécessaire
    },
    logout() {
      // Implémente la logique de déconnexion
      console.log("Déconnexion");
    },
    create() {
      console.log("Creer");
    },
  },
});
</script>

<style scoped></style>
