<template>
  <v-app-bar app color="accent" dark>
    <v-app-bar-nav-icon
      @click="toggleDrawer"
      class="d-md-none"
    ></v-app-bar-nav-icon>

    <v-toolbar-title @click="navigateToHome" class="cursor-pointer"
      >Workload Plannerz</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      v-if="user.firstname && user.lastname"
      color="secondary"
      class="d-none d-md-flex"
    >
      {{ user.firstname }} {{ user.lastname }}
    </v-btn>
    <v-btn
      v-if="isLoggedIn"
      color="secondary"
      @click="createTeam"
      class="d-none d-md-flex"
    >
      Créer un groupe
    </v-btn>
    <v-btn
      v-if="isLoggedIn"
      color="secondary"
      @click="logout"
      class="d-none d-md-flex"
    >
      Déconnexion
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary color="accent">
    <v-list>
      <v-list-item v-if="user.firstname && user.lastname">
        <v-list-item-title class="text-on-accent"
          >{{ user.firstname }} {{ user.lastname }}</v-list-item-title
        >
      </v-list-item>
      <v-list-item v-if="isLoggedIn" @click="createTeam">
        <v-list-item-title class="text-on-accent"
          >Créer un groupe</v-list-item-title
        >
      </v-list-item>
      <v-list-item v-if="isLoggedIn" @click="logout">
        <v-list-item-title class="text-on-accent"
          >Déconnexion</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { user, isLoggedIn } from "@/models/UseUser";
import useAuthController from "@/controllers/AuthControllers/UseAuthController";
import router from "@/router";

export default defineComponent({
  name: "Plannerz_Navbar",
  setup() {
    const { logout } = useAuthController();
    const drawer = ref(false);

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    const createTeam = () => {
      router.push("/create");
      drawer.value = false;
    };

    const navigateToHome = () => {
      router.push("/");
    };

    return {
      toggleDrawer,
      logout,
      createTeam,
      user,
      isLoggedIn,
      navigateToHome,
      drawer,
    };
  },
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.text-on-accent {
  color: var(--v-theme-on-accent) !important;
}
</style>
