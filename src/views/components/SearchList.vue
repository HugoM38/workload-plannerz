<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Rechercher"
      outlined
      class="bg-accent text-on-accent mb-4"
    ></v-text-field>

    <v-card class="member-card">
      <v-card-title>Membres de l'équipe</v-card-title>
      <v-card-text class="member-card-content">
        <v-list class="member-list">
          <v-list-item
            v-for="(member, index) in filteredTeamMembers"
            :key="index"
            class="member-list-item"
          >
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
                  <v-btn color="error" @click="removeMember(member)"
                    >Retirer</v-btn
                  >
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="member-card mt-4">
      <v-card-title>Non-membres de l'équipe</v-card-title>
      <v-card-text class="member-card-content">
        <v-list class="member-list">
          <v-list-item
            v-for="(nonMember, index) in filteredNonMembers"
            :key="index"
            class="member-list-item"
          >
            <v-row align="center" justify="space-between" no-gutters>
              <v-col>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ nonMember.firstname }}
                    {{ nonMember.lastname }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    nonMember.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="auto">
                <v-list-item-action>
                  <v-btn color="primary" @click="addMember(nonMember)"
                    >Ajouter</v-btn
                  >
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="6000" top>
      {{ error }}
      <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/SearchListController.ts"
></script>

<style scoped>
.member-card {
  background-color: #c6c5c5;
  border: 4px solid #dd7373;
  max-height: 400px;
  overflow-y: auto;
}

.member-card-content {
  max-height: 300px;
  overflow-y: auto;
}

.member-list {
  background-color: inherit;
  padding: 8px;
}

.member-list-item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff3e0;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
