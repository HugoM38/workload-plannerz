<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="12">
        <ListItem :text="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListItem from "../components/ListItemTeams.vue";

export default defineComponent({
  name: "ListTeams",
  components: {
    ListItem,
  },
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
  },
});
</script>

<style scoped></style>
