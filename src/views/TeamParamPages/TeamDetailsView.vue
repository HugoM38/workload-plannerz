<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>
            <h1>Détails de l'équipe</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="team.name"
                  label="Nom de l'équipe"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="team.owner"
                  label="Propriétaire"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-subheader>Membres de l'équipe</v-subheader>
                <v-list>
                  <v-list-item v-for="(member, index) in members" :key="index">
                    <v-row align="center" justify="space-between" no-gutters>
                      <v-col>
                        <v-list-item-content>
                          <v-list-item-title
                            >{{ member.firstname }}
                            {{ member.lastname }}</v-list-item-title
                          >
                          <v-list-item-subtitle>{{
                            member.email
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-col>
                      <v-col cols="auto">
                        <v-list-item-action>
                          <v-btn color="primary" @click="viewTasks(member._id)"
                            >Voir les tâches</v-btn
                          >
                        </v-list-item-action>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
  src="@/controllers/TeamControllers/TeamDetailsController.ts"
></script>

<style scoped></style>
