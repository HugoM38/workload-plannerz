<template>
  <v-app>
    <Plannerz_Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Plannerz_Navbar from "@/views/Components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Plannerz_Navbar,
  },
});
</script>

<style>
@import "~vuetify/dist/vuetify.min.css";
</style>
