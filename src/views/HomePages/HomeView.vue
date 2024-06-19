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

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--v-theme-primary);
}

.centered-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
}

.v-snackbar {
  background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
}

.v-btn {
  color: var(--v-theme-on-primary);
  background-color: var(--v-theme-primary);
}
</style>
