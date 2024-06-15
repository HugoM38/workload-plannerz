<template>
  <v-container>
    <v-row>
      <v-col v-for="(team, index) in teams" :key="index" cols="12">
        <ListItem :team="team" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/ListTeamsController.ts"
></script>

<style scoped></style>
