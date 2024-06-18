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

<style scoped>
.team-card {
  background-color: var(--v-theme-accent);
  color: var(--v-theme-on-accent);
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-card-actions {
  justify-content: flex-end;
}

.v-btn {
  color: var(--v-theme-on-primary);
  background-color: var(--v-theme-primary);
}
</style>
