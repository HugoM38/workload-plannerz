<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="bg-accent text-on-accent pa-5">
          <v-card-title>
            <h1>Éditer le groupe</h1>
          </v-card-title>
          <v-card-text>
            <TeamForm :name="team.name" @update:name="updateGroupName" />
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn class="btn bg-primary" @click="editGroup">Modifier</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="bg-accent text-on-accent pa-5 mt-4">
          <v-card-title>
            <h2>Membres et non-membres</h2>
          </v-card-title>
          <v-card-text>
            <SearchList
              :teamMembers="teamMembers"
              :nonMembers="nonMembers"
              @update:teamMembers="updateTeamMembers"
              @update:nonMembers="updateNonMembers"
            />
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ error }}
          <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamEditController.ts"
></script>

<style scoped src="@/styles/TeamStyles/TeamEdit.css"></style>
