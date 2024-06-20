@@ -1,72 +1,46 @@
<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="bg-accent text-on-accent pa-5">
              <v-card-title class="title">
                <h3>Créer une nouvelle équipe</h3>
              </v-card-title>
              <v-card-text>
                <TeamForm v-model:name="teamName" />
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn class="btn bg-primary" @click="createTeam">Créer</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamCreateController.ts"
></script>

<style scoped src="@/styles/TeamStyles/TeamCreate.css"></style>
