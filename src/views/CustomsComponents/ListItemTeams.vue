<template>
  <v-card class="team-card ma-4 pa-2 bg-accent text-on-accent">
    <v-card-title>{{ team.name }}</v-card-title>
    <v-card-actions>
      <v-btn color="secondary" @click="viewTeam">Voir l'équipe</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/ListItemTeamsController.ts"
></script>

<style scoped src="@/styles/ComponentsStyles/ListItemTeams.css"></style>
