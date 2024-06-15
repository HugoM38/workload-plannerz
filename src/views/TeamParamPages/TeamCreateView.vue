<template>
  <v-app>
    <v-main>
      <v-container>
        <TeamForm />
        <SearchList />
        <v-btn color="primary" @click="create_group">Créer</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamCreateController.ts"
></script>

<style scoped></style>
