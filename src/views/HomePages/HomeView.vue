<template>
  <v-app>
    <v-container>
      <ListTeams :items="listItems" />
    </v-container>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/HomeControllers/HomeController.ts"
></script>

<style>
@import "~vuetify/dist/vuetify.min.css";
</style>
