<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Mon App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="user.firstName && user.lastName" color="primary">
      {{ user.firstName }} {{ user.lastName }}
    </v-btn>
    <v-btn v-if="isLoggedIn" color="primary" @click="createGroup"
      >Créer un groupe</v-btn
    >
    <v-btn v-if="isLoggedIn" color="primary" @click="logout">Déconnexion</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user, isLoggedIn } from "@/models/UseUser";
import useAuthController from "@/controllers/UseAuthController";

export default defineComponent({
  name: "Plannerz_Navbar",
  setup() {
    const { logout, createGroup } = useAuthController();

    const toggleDrawer = () => {
      // Implement logic to show/hide the drawer (side menu) if necessary
    };

    return {
      toggleDrawer,
      logout,
      createGroup,
      user,
      isLoggedIn,
    };
  },
});
</script>

<style scoped></style>
