<template>
  <v-app>
    <v-container>
      <ListTeams :items="listItems" />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListTeams from "./ListTeams.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    ListTeams,
  },
  data() {
    return {
      listItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },
});
</script>

<style>
@import "~vuetify/dist/vuetify.min.css";
</style>
