<template>
  <v-app>
    <v-main>
      <h1>Éditer le groupe</h1>
      <v-container>
        <TeamForm :name="team.name" @update:name="updateGroupName" />
        <v-btn color="primary" @click="editGroup">Modifier</v-btn>
        <SearchList
          :teamMembers="teamMembers"
          :nonMembers="nonMembers"
          @update:teamMembers="updateTeamMembers"
          @update:nonMembers="updateNonMembers"
        />
        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ error }}
          <v-btn color="red" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamEditController.ts"
></script>

<style scoped></style>
