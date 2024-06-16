<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Mon App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="user.firstname && user.lastname" color="primary">
      {{ user.firstname }} {{ user.lastname }}
    </v-btn>
    <v-btn v-if="isLoggedIn" color="primary" @click="createTeam"
      >Créer un groupe</v-btn
    >
    <v-btn v-if="isLoggedIn" color="primary" @click="logout">Déconnexion</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user, isLoggedIn } from "@/models/UseUser";
import useAuthController from "@/controllers/AuthControllers/UseAuthController";
import router from "@/router";

export default defineComponent({
  name: "Plannerz_Navbar",
  setup() {
    const { logout } = useAuthController();

    const toggleDrawer = () => {
      // Implement logic to show/hide the drawer (side menu) if necessary
    };

    const createTeam = () => {
      router.push("/create");
    };

    return {
      toggleDrawer,
      logout,
      createTeam,
      user,
      isLoggedIn,
    };
  },
});
</script>

<style scoped></style>
