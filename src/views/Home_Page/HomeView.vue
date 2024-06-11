<template>
  <v-app>
    <v-container>
      <List_Groups :items="listItems" />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List_Groups from "./List_Groups.vue";

export default defineComponent({
  name: "Home_Page",
  components: {
    List_Groups,
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
