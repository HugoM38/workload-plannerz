<template>
  <v-form>
    <v-text-field
      v-model="groupName"
      label="Nom du groupe"
      outlined
    ></v-text-field>
  </v-form>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamFormController.ts"
></script>

<style scoped></style>
