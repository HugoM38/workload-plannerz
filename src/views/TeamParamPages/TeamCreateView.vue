<template>
  <v-app>
    <v-main>
      <v-container>
        <TeamForm v-model:name="teamName" />
        <v-btn color="primary" @click="createTeam">Créer</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamCreateController.ts"
></script>

<style scoped></style>
