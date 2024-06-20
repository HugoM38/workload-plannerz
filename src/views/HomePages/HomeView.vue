<template>
  <v-app>
    <v-container class="home-container bg-primary" fluid>
      <ListTeams v-if="listItems.length > 0" :teams="listItems" />
      <div v-if="listItems.length == 0" class="centered-content">
        <h1>Aucune Équipe</h1>
      </div>
      <v-snackbar v-model="snackbar" :timeout="6000" top>
        {{ error }}
        <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/HomeControllers/HomeController.ts"
></script>

<style scoped src="@/styles/HomeStyles/Home.css"></style>
