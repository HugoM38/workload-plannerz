<template>
  <v-form>
    <v-text-field
      v-model="localTeamName"
      label="Nom du groupe"
      outlined
      class="bg-accent text-on-accent"
    ></v-text-field>
  </v-form>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamFormController.ts"
></script>

<style scoped></style>
