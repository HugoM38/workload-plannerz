<template>
  <v-form>
    <v-text-field
      v-model="groupName"
      label="Nom du groupe"
      outlined
    ></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GroupForm",
  setup() {
    const groupName = ref("");
    return {
      groupName,
    };
  },
});
</script>

<style scoped></style>
