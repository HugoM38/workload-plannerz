<template>
  <v-app>
    <v-main>
      <h1>Éditer le groupe {{ id }}</h1>
      <v-container>
        <TeamForm />
        <SearchList />
        <v-btn color="primary" @click="edit_group">Modifier</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamEditController.ts"
></script>

<style scoped></style>
