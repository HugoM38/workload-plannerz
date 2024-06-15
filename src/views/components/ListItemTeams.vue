<template>
  <v-card class="ma-2">
    <v-card-text>
      {{ text }}
      <v-btn class="ml-4" color="primary" @click="viewGroup"
        >Voir le groupe</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItemTeams",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    viewGroup() {
      // Implémente la logique pour voir le groupe
      console.log(`Voir le groupe: ${this.text}`);
    },
  },
});
</script>

<style scoped></style>
