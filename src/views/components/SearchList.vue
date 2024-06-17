<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Rechercher"
      outlined
    ></v-text-field>
    <h2>Membres de l'équipe</h2>
    <v-list>
      <v-list-item v-for="(member, index) in filteredTeamMembers" :key="index">
        <v-list-item-content>
          <v-list-item-title
            >{{ member.firstname }} {{ member.lastname }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="error" @click="removeMember(member)">Retirer</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <h2>Non-membres de l'équipe</h2>
    <v-list>
      <v-list-item
        v-for="(nonMember, index) in filteredNonMembers"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title
            >{{ nonMember.firstname }}
            {{ nonMember.lastname }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="primary" @click="addMember(nonMember)">Ajouter</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackbar" :timeout="6000" top>
      {{ error }}
      <v-btn color="red" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/SearchListController.ts"
></script>

<style scoped></style>
