<template>
  <v-app>
    <v-container>
      <ListTeams :items="listItems" />
      <v-snackbar v-model="snackbar" :timeout="6000" top>
        {{ error }}
        <v-btn color="red" @click="snackbar = false">Close</v-btn>
      </v-snackbar>
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
