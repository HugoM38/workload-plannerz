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
                <v-chip
                  v-for="(member, index) in team.members"
                  :key="index"
                  label
                  >{{ member }}</v-chip
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamDetailsController.ts"
></script>

<style scoped></style>
