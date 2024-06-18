<template>
  <v-card class="ma-4 pa-2">
    <v-card-title>{{ team.name }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" @click="viewGroup">Voir le groupe</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/ListItemTeamsController.ts"
></script>

<style scoped>
.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.v-card-actions {
  justify-content: flex-end;
}
</style>
